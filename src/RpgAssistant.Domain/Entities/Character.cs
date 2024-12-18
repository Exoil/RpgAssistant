namespace RpgAssistant.Domain.Entities;

public record Character(
    Ulid Id,
    string Name,
    string Description,
    IList<Ulid> KnowCharacters);