namespace LoreWeave.Domain.Models;

public sealed record CharacterWithKnowRelation(
    Ulid Id,
    string Name,
    IReadOnlyCollection<Ulid> KnowCharacterIds);
