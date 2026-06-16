using System.ComponentModel.DataAnnotations;

using LoreWeave.Application.Commands;
using LoreWeave.Domain.Extensions;

namespace LoreWeave.Api.Dtos;

public record CreateKnowsDto(
    Guid FromCharacterId,
    Guid ToCharacterId,
    [StringLength(50, MinimumLength = 0, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    string Description,
    bool IsStrongRelation)
{
    public CreateKnowRelationCommand ToCommand() =>
        new(
            FromCharacterId.GuidToUlid(),
            ToCharacterId.GuidToUlid(),
            Description,
            IsStrongRelation);
}
