using System.ComponentModel.DataAnnotations;

using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Application.Models.Characters;

/// <summary>
/// Represents the creation of a character within the RPG Assistant application.
/// This object is used as a value object to encapsulate the necessary data
/// and validation required for character creation.
/// </summary>
public record CreateCharacter : BaseValueObject
{
    /// <summary>
    /// Gets the name of the model associated with the object.
    /// Used as an identifier to provide context during validation or exception handling.
    /// </summary>
    protected override string ModelName { get; } = nameof(CreateCharacter);

    /// <summary>
    /// Gets the name of the character to be created.
    /// </summary>
    /// <remarks>
    /// This property holds the name of the character that is being created.
    /// It is a required field and is validated during the creation process.
    /// </remarks>
    [Required]
    [StringLength(CharacterConstants.NameMaximumLenght, MinimumLength = CharacterConstants.NameMinimumLenght, ErrorMessage = CharacterConstants.NameErrorMessage)]
    public string Name { get; init; }

    /// Represents the model used to create a new character.
    /// This class inherits from the `BaseValueObject` and requires validation for its properties.
    /// It represents the domain-specific value object for initializing a character creation.
    /// Properties:
    /// - `Name` (string): The name of the character to be created.
    /// Validation: The `Validate` method in the base class ensures that the `Name` property adheres to any
    /// defined data annotations or validation rules for the model.
    public CreateCharacter(string name)
    {
        Name = name;
        Validate();
    }
}
