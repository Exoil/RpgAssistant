namespace RpgAssistant.Application.Commands;

public record UpdateCharacterCommand(Guid Id, string Name, int Version);
