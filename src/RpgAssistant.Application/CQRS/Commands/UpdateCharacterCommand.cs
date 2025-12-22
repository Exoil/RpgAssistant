namespace RpgAssistant.Application.CQRS.Commands;

public record UpdateCharacterCommand(Guid Id, string Name, int Version);
