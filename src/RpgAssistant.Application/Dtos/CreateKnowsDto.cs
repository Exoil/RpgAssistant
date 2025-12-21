using System.ComponentModel.DataAnnotations;

using RpgAssistant.Application.CQRS.Commands;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Application.Dtos;

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
};
