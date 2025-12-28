using Neo4j.Driver;

using RpgAssistant.Domain.Entities.Characters;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Entities.Characters.Queries;
using RpgAssistant.Domain.Entities.Knows.Commands;

namespace RpgAssistant.Domain.Repositories;

public interface ICharacterRepository
{
    Task CreateAsync(IAsyncTransaction transaction, CreateCharacter createCharacter);

    Task UpdateAsync(IAsyncTransaction transaction, Ulid id, UpdateCharacter updateCharacter);

    Task<(bool Exists, int Version)> ExistsAsync(IAsyncTransaction transaction, Ulid id);

    Task DeleteAsync(IAsyncTransaction transaction, DeleteCharacter deleteCharacter);

    Task<Character> GetAsync(IAsyncTransaction transaction, Ulid id);

    Task<IReadOnlyCollection<Character>> GetAsync(IAsyncTransaction transaction, GetCharacterPage characterPage);

    Task CreateKnowRelationAsync(IAsyncTransaction transaction, CreateKnowRelation createKnowRelation);

    Task DeleteKnowRelationAsync(IAsyncTransaction transaction, DeleteKnowRelation createKnowRelation);
}
