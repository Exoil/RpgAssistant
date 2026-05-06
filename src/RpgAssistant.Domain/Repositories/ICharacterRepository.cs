using Neo4j.Driver;

using RpgAssistant.Domain.Entities.Characters;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Entities.Characters.Queries;
using RpgAssistant.Domain.Entities.Knows.Commands;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Repositories;

public interface ICharacterRepository
{
    Task CreateAsync(IAsyncTransaction transaction, CreateCharacter createCharacter);

    Task UpdateAsync(IAsyncTransaction transaction, Ulid id, UpdateCharacter updateCharacter);

    Task<(bool Exists, int Version)> ExistsAsync(IAsyncTransaction transaction, Ulid id);

    Task DeleteAsync(IAsyncTransaction transaction, DeleteCharacter deleteCharacter);

    Task<Character> GetAsync(IAsyncTransaction transaction, Ulid id);

    Task<IReadOnlyCollection<CharacterWithKnowRelation>> GetAsync(
        IAsyncTransaction transaction,
        GetCharacterPage characterPage,
        CharacterSearchFilter searchFilter);

    Task CreateKnowRelationAsync(IAsyncTransaction transaction, CreateKnowRelation createKnowRelation);

    Task DeleteKnowRelationAsync(IAsyncTransaction transaction, DeleteKnowRelation createKnowRelation);

    Task<IReadOnlyCollection<Ulid>> FindPathBetweenCharactersAsync(
        IAsyncTransaction transaction,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        int maxHops);
}
