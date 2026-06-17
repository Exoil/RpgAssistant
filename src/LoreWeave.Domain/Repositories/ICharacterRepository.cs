using Neo4j.Driver;

using LoreWeave.Domain.Entities.Characters;
using LoreWeave.Domain.Entities.Characters.Commands;
using LoreWeave.Domain.Entities.Characters.Queries;
using LoreWeave.Domain.Entities.Knows.Commands;
using LoreWeave.Domain.Models;

namespace LoreWeave.Domain.Repositories;

public interface ICharacterRepository
{
    Task CreateAsync(IAsyncTransaction transaction, CreateCharacter createCharacter);

    Task UpdateAsync(IAsyncTransaction transaction, Ulid id, UpdateCharacter updateCharacter);

    Task<EntityExistence> CharacterExistsAsync(IAsyncTransaction transaction, Ulid id);

    Task DeleteAsync(IAsyncTransaction transaction, DeleteCharacter deleteCharacter);

    Task<Character> GetAsync(IAsyncTransaction transaction, Ulid id);

    Task<IReadOnlyCollection<CharacterWithKnowRelation>> GetAsync(
        IAsyncTransaction transaction,
        GetCharacterPage characterPage,
        CharacterSearchFilter searchFilter);

    Task CreateKnowRelationAsync(IAsyncTransaction transaction, CreateKnowRelation createKnowRelation);

    Task<EntityExistence> KnowRelationExistsAsync(
        IAsyncTransaction transaction,
        Ulid fromCharacterId,
        Ulid toCharacterId);

    Task UpdateKnowRelationAsync(IAsyncTransaction transaction, UpdateKnowRelation updateKnowRelation);

    Task DeleteKnowRelationAsync(IAsyncTransaction transaction, DeleteKnowRelation createKnowRelation);

    Task<IReadOnlyCollection<Ulid>> FindPathBetweenCharactersAsync(
        IAsyncTransaction transaction,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        int maxHops);
}
