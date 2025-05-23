using System.Text.Json.Serialization;

using RpgAssistant.Application.Models.Characters;

namespace RpgAssistant.Api.Models.Characters;

internal record CreateCharacterDto(
    [property:JsonPropertyName("name")]string Name)
{
    public CreateCharacter ToCreateCharacter() => new(Name);
}
