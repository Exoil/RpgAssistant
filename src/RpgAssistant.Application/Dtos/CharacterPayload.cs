using System.Text.Json.Serialization;

namespace RpgAssistant.Application.Dtos;

public record CharacterPayload(
    [property: JsonPropertyName("id")] Guid Id,
    [property: JsonPropertyName("name")] string Name,
    [property: JsonPropertyName("version")] int Version);
