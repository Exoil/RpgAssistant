using FluentAssertions;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Application.Test.Commands;

public class UpdateCharacterCommandTests
{
    [Fact]
    public void Constructor_ShouldThrowValidationException_WhenNameIsNullOrEmpty()
    {
        // Arrange
        var id = Ulid.NewUlid();
        string name = string.Empty;
        string description = "Valid Description";

        // Act
        Action action = () => new UpdateCharacterCommand(id, name, description);

        // Assert
        action.Should().Throw<ValidationException>();
    }

    [Fact]
    public void Constructor_ShouldThrowValidationException_WhenDescriptionIsTooLong()
    {
        // Arrange
        var id = Ulid.NewUlid();
        string name = "Valid Name";
        string description = new string('*', 256); // Assuming max length is 255

        // Act
        Action action = () => new UpdateCharacterCommand(id, name, description);

        // Assert
        action.Should().Throw<ValidationException>();
    }

    [Fact]
    public void Constructor_ShouldNotThrow_WhenAllPropertiesAreValid()
    {
        // Arrange
        var id = Ulid.NewUlid();
        string name = "Valid Name";
        string description = "Valid Description";

        // Act
        Action action = () => new UpdateCharacterCommand(id, name, description);

        // Assert
        action.Should().NotThrow();
    }
}