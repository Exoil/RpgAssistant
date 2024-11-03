using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.Test.Models;

public class CreateCharacterTest
{
    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public void Constructor_Should_Throw_ValidationException_For_Invalid_Name()
    {
        // Arrange
        string invalidName = new String('A', CharacterConstants.MaxNameLength + 1);
        string validDescription = new String('B', CharacterConstants.MinDescriptionLength);
            
        // Act
        Action act = () => new CreateCharacter(invalidName, validDescription);

        // Assert
        act.Should().Throw<ValidationException>();
    }

    [Fact]
    public void Constructor_Should_Throw_ValidationException_For_Invalid_Description()
    {
        // Arrange
        string validName = new String('A', CharacterConstants.MinNameLength);
        string invalidDescription = new String('B', CharacterConstants.MaxDescriptionLength + 1);
            
        // Act
        Action act = () => new CreateCharacter(validName, invalidDescription);

        // Assert
        act.Should().Throw<ValidationException>();
    }
}