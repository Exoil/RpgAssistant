using Neo4j.Driver;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Domain.ErrorMessages;
using RpgAssistant.Domain.Exceptions;
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
            RETURN ch.Id AS Id, ch.Name AS Name, ch.Description";
        var query = new Query(queryString, new { Id = id.ToDatabaseId() });
        
        var cursorResult = await _session.RunAsync(query);

        if (cursorResult is null)
        {
            throw CharacterErrorMessages.GetNotFoundCharacterMessage("DataSource");
        }
        
        var campaign = await cursorResult
            .SingleAsync(record
                => new Character(
                    Ulid.Parse(record["Id"].As<string>()),
                    record["Name"].As<string>(),
                    record["Description"].As<string>()));

        return campaign ?? throw CharacterErrorMessages.GetNotFoundCharacterMessage("DataSource");
    }
}