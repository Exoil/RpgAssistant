using System.Text.Json.Serialization;

namespace Loreweave.Application.Models;

public record RelationPathPayload(
    [property: JsonPropertyName("characterIds")]
    IReadOnlyCollection<Guid> CharacterIds,
    [property: JsonPropertyName("hops")]
    int Hops);