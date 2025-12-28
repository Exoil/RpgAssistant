namespace RpgAssistant.Api.CQRS.Commands;

public record CreateCharacterCommand(Ulid Id, string Name);
