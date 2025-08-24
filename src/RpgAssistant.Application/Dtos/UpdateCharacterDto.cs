using System.Text.Json.Serialization;

using RpgAssistant.Application.CQRS.Commands;

namespace RpgAssistant.Application.Dtos;

public record UpdateCharacterDto(
    [property: JsonPropertyName("name")]
    string Name,
    [property: JsonPropertyName("version")]
    int Version)
{
    public UpdateCharacterCommand ToCommand(Guid id) => new(id, Name, Version);
}
