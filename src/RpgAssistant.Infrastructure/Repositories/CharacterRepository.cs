using Neo4j.Driver;
using RpgAssistant.Domain.Entities.Characters;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.Repositories.Extensions;

namespace RpgAssistant.Infrastructure.Repositories;

public class CharacterRepository
{
    private readonly IAsyncTransaction _transaction;

    public CharacterRepository(IAsyncTransaction transaction)
    {
        _transaction = transaction;
    }

    public async Task CreateAsync(CreateCharacter createCharacter)
    {
        const string queryString = @"
            CREATE (ch:Character {Id: $CharacterId, Name: $Name, Version: 1})
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(queryString, new { CharacterId = createCharacter.Id.ToDatabaseId(), Name = createCharacter.Name });

        await _transaction.RunAsync(query);
    }

    public async Task UpdateAsync(Ulid id, UpdateCharacter updateCharacter)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $CharacterId })
            SET
                ch.Name = $Name,
                ch.Version = ch.Version + 1
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(queryString, new { CharacterId = id.ToDatabaseId(), Name = updateCharacter.Name });

        await _transaction.RunAsync(query);
    }

    public async Task<(bool Exists, int Version)> ExistsAsync(Ulid id)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id })
            RETURN ch IS NOT NULL AS Exists, coalesce(ch.Version, -1) AS Version";
        var query = new Query(queryString, new { Id = id.ToDatabaseId()});

        var cursorResult = await _transaction.RunAsync(query);

        var records = await cursorResult.ToListAsync();

        if (records.Count == 0)
        {
            return (false, -1);
        }


        var result = await cursorResult
            .SingleAsync(record => (record["Exists"].As<bool>(), record["Version"].As<int>()));

        return result;
    }

    public async Task<Character> GetAsync(Ulid id)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id})
            RETURN ch.Id AS Id, ch.Name AS Name, ch.Version AS Version";
        var query = new Query(queryString, new { Id = id.ToDatabaseId() });

        var cursorResult = await _transaction.RunAsync(query);

        var character = await cursorResult
            .SingleAsync(record
                => record.ToCharacter());

        return character;
    }
}
