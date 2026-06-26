using Neo4j.Driver;

using LoreWeave.Domain.Entities.Characters;
using LoreWeave.Domain.Entities.Characters.Commands;
using LoreWeave.Domain.Entities.Characters.Queries;
using LoreWeave.Domain.Entities.Knows;
using LoreWeave.Domain.Entities.Knows.Commands;
using LoreWeave.Domain.Models;

namespace LoreWeave.Domain.Repositories;

public interface ICharacterRepository
{
    Task CreateAsync(IAsyncTransaction transaction, CreateCharacter createCharacter);

    Task UpdateAsync(IAsyncTransaction transaction, Guid id, UpdateCharacter updateCharacter);

    Task<EntityExistence> CharacterExistsAsync(IAsyncTransaction transaction, Guid id);

    Task DeleteAsync(IAsyncTransaction transaction, DeleteCharacter deleteCharacter);

    Task<Character> GetAsync(IAsyncTransaction transaction, Guid id);

    Task<IReadOnlyCollection<CharacterWithKnowRelation>> GetAsync(
        IAsyncTransaction transaction,
        GetCharacterPage characterPage,
        CharacterSearchFilter searchFilter);

    Task CreateKnowRelationAsync(IAsyncTransaction transaction, CreateKnowRelation createKnowRelation);

    Task<EntityExistence> KnowRelationExistsAsync(
        IAsyncTransaction transaction,
        Guid fromCharacterId,
        Guid toCharacterId);

    Task<KnowRelation> GetKnowRelationAsync(
        IAsyncTransaction transaction,
        Guid fromCharacterId,
        Guid toCharacterId);

    Task UpdateKnowRelationAsync(IAsyncTransaction transaction, UpdateKnowRelation updateKnowRelation);

    Task DeleteKnowRelationAsync(IAsyncTransaction transaction, DeleteKnowRelation createKnowRelation);

    Task<IReadOnlyCollection<Guid>> FindPathBetweenCharactersAsync(
        IAsyncTransaction transaction,
        Guid fromCharacterId,
        Guid toCharacterId,
        int maxHops);
}
