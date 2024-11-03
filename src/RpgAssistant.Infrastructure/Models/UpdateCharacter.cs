using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models;

public record UpdateCharacter : BaseValueObject
{
    protected override string ModelName { get; } = nameof(UpdateCharacter);

    [Required]
    public Ulid Id { get; }

    [Required]
    [StringLength(CharacterConstants.MaxNameLength, MinimumLength = CharacterConstants.MinNameLength, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public string Name { get; }

    [StringLength(CharacterConstants.MaxDescriptionLength, MinimumLength = CharacterConstants.MinNameLength, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public string Description { get; }

    public UpdateCharacter(
        Ulid id,
        string name,
        string description)
    {
        Id = id;
        Name = name;
        Description = description;
        
        Validate();
    }
}