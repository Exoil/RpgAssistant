namespace LoreWeave.Application.Queries;

public record GetCharacterPageQuery(
    uint Number,
    uint Size,
    string SortType,
    string SortOrder,
    string? CharacterName);
