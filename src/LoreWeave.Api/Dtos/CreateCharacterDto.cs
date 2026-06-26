using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using LoreWeave.Application.Commands;

namespace LoreWeave.Api.Dtos;

public record CreateCharacterDto(
    [property: JsonPropertyName("name")]
    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    string Name)
{
    public CreateCharacterCommand ToCommand() => new(Guid.CreateVersion7(), Name);
}
