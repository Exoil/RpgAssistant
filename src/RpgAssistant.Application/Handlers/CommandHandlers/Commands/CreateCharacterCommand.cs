namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record CreateCharacterCommand(
    string Name,
    string Description);