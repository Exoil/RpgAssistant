using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RpgAssistant.Application.Dtos;

public record CharacterPayload(
    [property: JsonPropertyName("id")] Guid Id,
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    [property: JsonPropertyName("name")]
    string Name,
    [property: JsonPropertyName("version")]
    [Range(minimum: 1, maximum: 100, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    string Version)
{
    public string Etag => $"\"{Version}\"";
};
