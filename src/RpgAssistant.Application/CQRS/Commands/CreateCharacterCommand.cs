namespace RpgAssistant.Application.CQRS.Commands;

public record CreateCharacterCommand(Ulid Id, string Name);
