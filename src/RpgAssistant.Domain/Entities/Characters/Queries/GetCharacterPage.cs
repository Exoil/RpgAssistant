using System.ComponentModel.DataAnnotations;

using RpgAssistant.Domain.Models;

namespace RpgAssistant.Domain.Entities.Characters.Queries;

public sealed record GetCharacterPage : BaseValueObject
{
    public GetCharacterPage(uint page, uint size, string sortType, string sortOrder)
    {
        Page = page;
        Size = size;
        SortType = sortType;
        SortOrder = sortOrder;
        Validate();
    }

    [Range(1, 100, ErrorMessage = "Value for {0} must be between {1} and {2}.")]

    public uint Page { get; init; }

    [Range(1, 50, ErrorMessage = "Value for {0} must be between {1} and {2}.")]

    public uint Size { get; init; }

    [StringLength(50, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public string SortType { get; init; }

    [RegularExpression("^(Asc|Desc)$", ErrorMessage = "Value for {0} must match one of: Asc, Desc.")]
    public string SortOrder { get; init; }
}
