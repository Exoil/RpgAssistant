using System.ComponentModel.DataAnnotations;

using Loreweave.Application.Commands;
using Loreweave.Domain.Extensions;

namespace Loreweave.Api.Dtos;

public record CreateKnowsDto(
    Guid FromCharacterId,
    Guid ToCharacterId,
    [StringLength(50, MinimumLength = 0, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    string Description)
{
    public CreateKnowRelationCommand ToCommand() =>
        new(
            FromCharacterId.GuidToUlid(),
            ToCharacterId.GuidToUlid(),
            Description);
}
