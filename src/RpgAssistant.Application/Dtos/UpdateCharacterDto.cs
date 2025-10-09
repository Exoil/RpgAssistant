using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using RpgAssistant.Application.CQRS.Commands;

namespace RpgAssistant.Application.Dtos;

public record UpdateCharacterDto(
    [property: JsonPropertyName("name")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    string Name,
    [property: JsonPropertyName("version")]
    [Range(minimum: 1, maximum:100, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    int Version)
{
    public UpdateCharacterCommand ToCommand(Guid id) => new(id, Name, Version);
}
