using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.Test.Models
{
    public class UpdateCharacterTests
    {
        [Fact]
        public void Should_Throw_ValidationError_When_Name_Length_Is_Less_Than_Minimum()
        {
            // Arrange
            var id = Ulid.NewUlid();
            var invalidName = new string('*', CharacterConstants.MinNameLength - 1);
            var validDescription = new string('*', CharacterConstants.MinDescriptionLength);
            
            // Act
            Action action = () => new UpdateCharacter(id, invalidName, validDescription);

            // Assert
            action.Should().Throw<ValidationException>();
        }

        [Fact]
        public void Should_Throw_ValidationError_When_Description_Length_Is_Greater_Than_Maximum()
        {
            // Arrange
            var id = Ulid.NewUlid();
            var validName = new string('*', CharacterConstants.MaxNameLength);
            var invalidDescription = new string('*', CharacterConstants.MaxDescriptionLength + 1);

            // Act
            Action action = () => new UpdateCharacter(id, validName, invalidDescription);

            // Assert
            action.Should().Throw<ValidationException>();
        }

        [Fact]
        public void Should_Not_Throw_Any_Error_When_Valid_Data_Is_Provided()
        {
            // Arrange
            var id = Ulid.NewUlid();
            var validName = new string('*', CharacterConstants.MaxNameLength);
            var validDescription = new string('*', CharacterConstants.MaxDescriptionLength);
            
            // Act
            Action action = () => new UpdateCharacter(id, validName, validDescription);

            // Assert
            action.Should().NotThrow();
        }
    }
}