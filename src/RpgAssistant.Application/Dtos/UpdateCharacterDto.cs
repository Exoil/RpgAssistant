using System.Text.Json.Serialization;

using RpgAssistant.Application.CQRS.Commands;

namespace RpgAssistant.Application.Dtos;

public record UpdateCharacterDto(
    [property: JsonPropertyName("name")]
    string Name)
{
    public UpdateCharacterCommand ToCommand() => new(Guid.NewGuid(), Name);
}
