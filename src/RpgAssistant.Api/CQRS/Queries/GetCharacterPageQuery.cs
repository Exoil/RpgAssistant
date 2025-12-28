namespace RpgAssistant.Api.CQRS.Queries;

public record GetCharacterPageQuery(uint Number, uint Size, string SortType, string SortOrder);
