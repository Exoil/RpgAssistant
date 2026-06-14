using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Loreweave.Application.Models;

public record CharacterPayloadWithRelations(
    [property: JsonPropertyName("id")]
    Guid Id,
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    [property: JsonPropertyName("name")]
    string Name,
    [property: JsonPropertyName("knowCharacterIds")]
    IReadOnlyCollection<Guid> KnowCharacterIds);
