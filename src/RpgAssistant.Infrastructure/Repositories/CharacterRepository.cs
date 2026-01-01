using Neo4j.Driver;

using RpgAssistant.Domain.Entities.Characters;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Entities.Characters.Queries;
using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Models;
using RpgAssistant.Domain.Repositories;
using RpgAssistant.Infrastructure.Repositories.Extensions;

namespace RpgAssistant.Infrastructure.Repositories;

public class CharacterRepository : ICharacterRepository
{
    public async Task CreateAsync(IAsyncTransaction transaction, CreateCharacter createCharacter)
    {
        const string queryString = @"
            CREATE (ch:Character {Id: $CharacterId, Name: $Name, Version: 1})
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(queryString,
            new
            {
                CharacterId = createCharacter.Id.ToDatabaseId(),
                createCharacter.Name
            });

        await transaction.RunAsync(query);
    }

    public async Task UpdateAsync(IAsyncTransaction transaction, Ulid id, UpdateCharacter updateCharacter)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $CharacterId })
            SET
                ch.Name = $Name,
                ch.Version = ch.Version + 1
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(queryString, new
        {
            CharacterId = id.ToDatabaseId(),
            updateCharacter.Name
        });

        await transaction.RunAsync(query);
    }

    public async Task<(bool Exists, int Version)> ExistsAsync(IAsyncTransaction transaction, Ulid id)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id })
            RETURN ch IS NOT NULL AS Exists, coalesce(ch.Version, -1) AS Version";
        var query = new Query(queryString, new
        {
            Id = id.ToDatabaseId()
        });

        var cursorResult = await transaction.RunAsync(query);

        var records = await cursorResult.ToListAsync();

        if (records.Count == 0)
        {
            return (false, -1);
        }

        var record = records[0];

        return (record["Exists"].As<bool>(), record["Version"].As<int>());
    }

    public async Task DeleteAsync(IAsyncTransaction transaction, DeleteCharacter deleteCharacter)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id })
            DETACH DELETE ch";
        var query = new Query(queryString, new
        {
            Id = deleteCharacter.Id.ToDatabaseId()
        });

        await transaction.RunAsync(query);
    }

    public async Task<Character> GetAsync(IAsyncTransaction transaction, Ulid id)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id})
            RETURN ch.Id AS Id, ch.Name AS Name, ch.Version AS Version";
        var query = new Query(queryString, new
        {
            Id = id.ToDatabaseId()
        });

        var cursorResult = await transaction.RunAsync(query);

        var character = await cursorResult
            .SingleAsync(record
                => record.ToCharacter());

        return character;
    }

    public async Task<IReadOnlyCollection<CharacterWithKnowRelation>> GetAsync(IAsyncTransaction transaction,
        GetCharacterPage characterPage)
    {
        var skip = (int)((characterPage.Page - 1) * characterPage.Size);
        var limit = (int)characterPage.Size;

        const string queryString = @"
            MATCH (ch:Character)-[r:KNOWS]->(toCh:Character)
            RETURN ch.Id AS Id, ch.Name AS Name, collect(toCh.Id) AS KnowRelationIds
            ORDER BY
                CASE WHEN $SortType = 'Id' AND $SortOrder = 'Asc' THEN ch.Id END ASC,
                CASE WHEN $SortType = 'Id' AND $SortOrder = 'Desc' THEN ch.Id END DESC,
                CASE WHEN $SortType = 'Name' AND $SortOrder = 'Asc' THEN ch.Name END ASC,
                CASE WHEN $SortType = 'Name' AND $SortOrder = 'Desc' THEN ch.Name END DESC,
                CASE WHEN $SortType = 'Version' AND $SortOrder = 'Asc' THEN ch.Version END ASC,
                CASE WHEN $SortType = 'Version' AND $SortOrder = 'Desc' THEN ch.Version END DESC
            SKIP $Skip
            LIMIT $Limit";

        var query = new Query(queryString, new
        {
            characterPage.SortType,
            characterPage.SortOrder,
            Skip = skip,
            Limit = limit
        });

        var cursorResult = await transaction.RunAsync(query);

        var characters = await cursorResult.ToListAsync(record => record.ToCharacterWithKnowRelation());

        return characters.AsReadOnly();
    }

    public async Task CreateKnowRelationAsync(IAsyncTransaction transaction, CreateKnowRelation createKnowRelation)
    {
        const string queryString = @"
            MATCH (fromCh:Character {Id: $FromCharacterId}), (toCh:Character {Id: $ToCharacterId})
            MERGE (fromCh)-[r:KNOWS]->(toCh)
            SET  r.Id = $Id, r.Version = $Version, r.Description = $Description";
        var query = new Query(
            queryString,
            new
            {
                Id = createKnowRelation.Id.ToDatabaseId(),
                FromCharacterId = createKnowRelation.FromCharacterId.ToDatabaseId(),
                ToCharacterId = createKnowRelation.ToCharacterId.ToDatabaseId(),
                createKnowRelation.Description,
                Version = 1
            });

        await transaction.RunAsync(query);
    }

    public async Task DeleteKnowRelationAsync(IAsyncTransaction transaction, DeleteKnowRelation createKnowRelation)
    {
        const string queryString = @"
            MATCH (fromCh:Character {Id: $FromCharacterId})-[r:KNOWS]->(toCh:Character {Id: $ToCharacterId})
            DELETE r";
        var query = new Query(
            queryString,
            new
            {
                FromCharacterId = createKnowRelation.FromCharacterId.ToDatabaseId(),
                ToCharacterId = createKnowRelation.ToCharacterId.ToDatabaseId()
            });

        await transaction.RunAsync(query);
    }
}
