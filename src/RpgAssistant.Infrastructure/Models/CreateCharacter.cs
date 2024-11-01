using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models;

public record CreateCharacter : BaseValueObject
{
    protected override string ModelName { get; } = nameof(CreateCharacter);
    [Required]
    [StringLength(CharacterConstants.MaxNameLength, MinimumLength = CharacterConstants.MinNameLength, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public string Name { get; }
    [StringLength(CharacterConstants.MaxDescriptionLength, MinimumLength = CharacterConstants.MinNameLength, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public string Description { get; }

    public CreateCharacter(
        string name,
        string description)
    {
        Name = name;
        Description = description;
        
        Validate();
    }
};