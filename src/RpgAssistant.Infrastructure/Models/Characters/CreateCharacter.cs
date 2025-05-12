using System.ComponentModel.DataAnnotations;

using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models.Characters;

/// <summary>
/// Represents a command model for creating a character in the system.
/// </summary>
/// <remarks>
/// This immutable record is used to encapsulate the properties required
/// for character creation and includes validation rules for the input data.
/// </remarks>
public record CreateCharacter : BaseValueObject
{
    /// <summary>
    /// Gets the name of the current model class being used as a unique identifier
    /// for validation or exception messaging within the application.
    /// </summary>
    protected override string ModelName { get; } = nameof(CreateCharacter);

    /// <summary>
    /// Represents the unique identifier for a character being created.
    /// This property is required and must be initialized with a non-empty value.
    /// </summary>
    public string Id { get; init; } = string.Empty;

    /// <summary>
    /// Represents the name of a character.
    /// </summary>
    /// <remarks>
    /// The name is a required property with constraints on its length. It must be between
    /// <see cref="CharacterConstants.NameMinimumLenght"/> and <see cref="CharacterConstants.NameMaximumLenght"/> characters.
    /// An appropriate validation error message is provided using <see cref="CharacterConstants.NameErrorMessage"/>.
    /// </remarks>
    [Required]
    [StringLength(CharacterConstants.NameMaximumLenght, MinimumLength = CharacterConstants.NameMinimumLenght, ErrorMessage = CharacterConstants.NameErrorMessage)]
    public string Name { get; init;}

    /// <summary>
    /// Represents the date and time, including the offset from UTC, when the character was created.
    /// </summary>
    /// <remarks>
    /// This property is required and is validated as part of the object validation logic.
    /// </remarks>
    [Required]
    public DateTimeOffset CreateDateTimeOffset { get; init; }

    /// <summary>
    /// Represents the timestamp associated with the entity, used for tracking or synchronization purposes.
    /// </summary>
    [Required]
    public long Timestamp { get; init; }

    /// <summary>
    /// Represents a character creation model, used to create new character entities within the RPG Assistant system.
    /// </summary>
    /// <remarks>
    /// This model encapsulates the necessary details for character creation, such as a unique identifier, name, creation timestamp, and date.
    /// The object undergoes data validation to ensure compliance with defined constraints during instantiation.
    /// </remarks>
    public CreateCharacter(
        string id,
        string name,
        DateTimeOffset createDateTimeOffset,
        long timestamp)
    {
        Id = id;
        Name = name;
        CreateDateTimeOffset = createDateTimeOffset;
        Timestamp = timestamp;
        Validate();
    }
}
