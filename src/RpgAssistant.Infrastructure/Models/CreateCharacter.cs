using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models;

public record CreateCharacter : BaseValueObject
{
    protected override string ModelName { get; set; } = nameof(CreateCharacter);
    [Required]
    [StringLength(CharacterConstants.MinNameLength, MinimumLength = CharacterConstants.MaxNameLength, ErrorMessage = "Name for {0} must be between {1} and {2} characters.")]
    public string Name;
    [StringLength(CharacterConstants.MinDescriptionLength, MinimumLength = CharacterConstants.MaxDescriptionLength, ErrorMessage = "Name for {0} must be between {1} and {2} characters.")]
    public string Description;

    public CreateCharacter(
        string name,
        string description)
    {
        Name = name;
        Description = description;
        
        Validate();
    }
};