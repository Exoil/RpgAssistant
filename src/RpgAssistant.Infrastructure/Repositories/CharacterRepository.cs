using System.Collections.Immutable;
using Neo4j.Driver;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Domain.ErrorMessages;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.IRepositories;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.Repositories;

public class CharacterRepository : 
    BaseNeo4jRepository, ICharacterRepository
{
    public CharacterRepository(IDriver driver) : base(driver)
    {
    }

    public async Task<Ulid> CreateAsync(CreateCharacter createCharacter, CancellationToken cancellationToken = default)
    {
        var id = Ulid.NewUlid();
        var queryString = @"
            CREATE (ch:Character {Id: $CharacterId, Name: $Name, Description: $Description}) 
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(
            queryString,
            new
            {
                CharacterId = id.ToDatabaseId(),
                createCharacter.Name,
                createCharacter.Description
            });

        await using var transaction =  await _session.BeginTransactionAsync();

        await transaction.RunAsync(query);
        await transaction.CommitAsync();

        return id;
    }

    public async Task<Character> GetAsync(Ulid id, CancellationToken cancellationToken = default)
    {
        var queryString = @"
            MATCH (ch:Character {Id: $Id})
            OPTIONAL MATCH (ch)-[:"+CharacterConstants.KnowsRelation+@"]->(connected:Character)
            RETURN ch.Id AS Id, ch.Name AS Name, ch.Description AS Description, 
                collect(connected.Id) AS ConnectedCharacterIds";
        var query = new Query(queryString, new { Id = id.ToDatabaseId() });
        
        var cursorResult = await _session.RunAsync(query);
        
        try
        {
            var character = await cursorResult
                .SingleAsync(record
                    => new Character(
                        Ulid.Parse(record["Id"].As<string>()),
                        record["Name"].As<string>(),
                        record["Description"].As<string>(),
                        record["ConnectedCharacterIds"].As<List<string>>().Select(Ulid.Parse).ToList()));

            return character ?? throw CharacterErrorMessages.GetNotFoundCharacterMessage("DataSource");
        }
        catch
        {
            throw CharacterErrorMessages.GetNotFoundCharacterMessage("DataSource");
        }
        
    }

    public async Task<ImmutableArray<Character>> GetAsync(Page page, CancellationToken cancellationToken = default)
    {
        var queryString = @"
            MATCH (ch:Character)
            OPTIONAL MATCH (ch)-[:"+CharacterConstants.KnowsRelation+@"]->(connected:Character)
            RETURN ch.Id AS Id, ch.Name AS Name, ch.Description AS Description, 
                collect(connected.Id) AS ConnectedCharacterIds
            SKIP $Skip
            LIMIT $Limit";
        var query = new Query(queryString, new { Skip = (int)page.Number * (int)page.Size , Limit = (int)page.Size });
        
        var cursorResult = (await _session.RunAsync(query)).ToListAsync(cancellationToken);

        if (cursorResult is null)
        {
            throw CharacterErrorMessages.GetNotFoundCharacterMessage("DataSource");
        }

        var characters = new List<Character>();

        if (!cursorResult.Result.Any())
        {
            return characters.ToImmutableArray();
        }

        var results = cursorResult.Result.ConvertAll(x => new Character(
            Ulid.Parse(x["Id"].As<string>()),
            x["Name"].As<string>(),
            x["Description"].As<string>(),
            x["ConnectedCharacterIds"].As<List<string>>().Select(Ulid.Parse).ToList())).AsEnumerable();
        characters.AddRange(results);

        return characters.ToImmutableArray();
    }

    public async Task UpdateAsync(UpdateCharacter updateCharacter, CancellationToken cancellationToken = default)
    {
        var queryString = @"
            MATCH (ch:Character {Id: $Id}) 
            SET ch.Name = $Name, ch.Description = $Description
            RETURN ID(ch) AS nodeId";

        var query = new Query(
            queryString,
            new
            {
                Id = updateCharacter.Id.ToDatabaseId(),
                updateCharacter.Name,
                updateCharacter.Description
            });
        
        await using var transaction =  await _session.BeginTransactionAsync();

        await transaction.RunAsync(query);
        await transaction.CommitAsync();
    }

    public async Task DeleteAsync(Ulid id, CancellationToken cancellationToken = default)
    {
        var queryString = @"
            MATCH (ch:Character {Id: $Id}) 
            DELETE ch";

        var query = new Query(
            queryString,
            new
            {
                Id = id.ToDatabaseId()
            });
        
        await using var transaction =  await _session.BeginTransactionAsync();

        await transaction.RunAsync(query);
        await transaction.CommitAsync();
    }

    public async Task CreateKnowsRelationAsync(Ulid sourceId, Ulid targetId, CancellationToken cancellationToken = default)
    {
        var parameters = new
        {
            SourceId = sourceId.ToDatabaseId(),
            TargetId = targetId.ToDatabaseId()
        };

        await using var transaction = await _session.BeginTransactionAsync();

        await ValidateModifyOfKnowsRelation(transaction, parameters);

        var createRelationQuery = @"
            MATCH (source:Character {Id: $SourceId}), (target:Character {Id: $TargetId})
            CREATE (source)-[:"+CharacterConstants.KnowsRelation+@"]->(target)";

        await transaction.RunAsync(new Query(createRelationQuery, parameters));
        await transaction.CommitAsync();
    }

    public async Task DeleteKnowsRelationAsync(Ulid sourceId, Ulid targetId, CancellationToken cancellationToken = default)
    {
        var parameters = new
        {
            SourceId = sourceId.ToDatabaseId(),
            TargetId = targetId.ToDatabaseId()
        };

        await using var transaction = await _session.BeginTransactionAsync();

        await ValidateModifyOfKnowsRelation(transaction, parameters);

        var deleteRelationQuery = @"
            MATCH (source:Character {Id: $SourceId})-[r:"+CharacterConstants.KnowsRelation+@"]->(target:Character {Id: $TargetId})
            DELETE r";

        await transaction.RunAsync(new Query(deleteRelationQuery, parameters));
        await transaction.CommitAsync();
    }

    private async Task ValidateModifyOfKnowsRelation(IAsyncTransaction transaction, object parameters)
    {
        var checkExistenceQuery = @"
            MATCH (source:Character {Id: $SourceId}), (target:Character {Id: $TargetId})
            RETURN COUNT(source) AS SourceCount, COUNT(target) AS TargetCount";

        var checkRelationQuery = @"
            MATCH (source:Character {Id: $SourceId})-[r:"+CharacterConstants.KnowsRelation+@"]->(target:Character {Id: $TargetId})
            RETURN COUNT(r) AS RelationCount";

        var existenceResult = await transaction.RunAsync(new Query(checkExistenceQuery, parameters));
        var existenceRecord = await existenceResult.SingleAsync();
        if (existenceRecord["SourceCount"].As<int>() == 0 || existenceRecord["TargetCount"].As<int>() == 0)
        {
            throw CharacterErrorMessages.GetNotFoundCharacterMessage("Not found character");
        }

        var relationResult = await transaction.RunAsync(new Query(checkRelationQuery, parameters));
        var relationRecord = await relationResult.SingleAsync();
        if (relationRecord["RelationCount"].As<int>() > 0)
        {
            throw CharacterErrorMessages.GetKnowsRelationCreationExceptionMessage("Character already knows this character");
        }
    }
}