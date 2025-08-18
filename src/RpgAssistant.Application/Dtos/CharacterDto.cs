using System.Text.Json.Serialization;

using RpgAssistant.Application.CQRS.Commands;

namespace RpgAssistant.Application.Dtos;

public record CharacterDto(
    [property: JsonPropertyName("name")]
    string Name)
{
    public CreateCharacterCommand ToCommand() => new(Ulid.NewUlid(), Name);
}
