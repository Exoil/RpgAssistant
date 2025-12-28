namespace RpgAssistant.Application.Commands;

public record CreateKnowRelationCommand(
    Ulid FromCharacterId,
    Ulid ToCharacterId,
    string Description);
