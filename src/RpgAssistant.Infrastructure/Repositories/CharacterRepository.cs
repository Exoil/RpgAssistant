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
            CREATE (ch:Character {Id: $CharacterId, Name: $Name n})
            RETURN ID(ch) AS CharacterNodeId";
        var query = new Query(queryString, new { Id = createCharacter.Id.ToDatabaseId(), Name = createCharacter.Name });

        await _transaction.RunAsync(query);
    }

    public async Task<Character> GetAsync(Ulid id)
    {
        const string queryString = @"
            MATCH (ch:Character {Id: $Id})
            RETURN ch.Id AS Id, ch.Name AS Name";
        var query = new Query(queryString, new { Id = id.ToDatabaseId() });

        var cursorResult = await _transaction.RunAsync(query);

        var character = await cursorResult
            .SingleAsync(record
                => record.ToCharacter());

        return character;
    }
}
