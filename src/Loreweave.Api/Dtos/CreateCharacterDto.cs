using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using Loreweave.Application.Commands;

namespace Loreweave.Api.Dtos;

public record CreateCharacterDto(
    [property: JsonPropertyName("name")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    string Name)
{
    public CreateCharacterCommand ToCommand() => new(Ulid.NewUlid(), Name);
}
