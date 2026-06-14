using Neo4j.Driver;

using Loreweave.Domain.Entities.Characters;
using Loreweave.Domain.Entities.Characters.Commands;
using Loreweave.Domain.Entities.Characters.Queries;
using Loreweave.Domain.Entities.Knows.Commands;
using Loreweave.Domain.Models;

namespace Loreweave.Domain.Repositories;

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
