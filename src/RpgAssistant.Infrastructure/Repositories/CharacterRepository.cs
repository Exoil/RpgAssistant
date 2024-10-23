using Neo4j.Driver;
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
}