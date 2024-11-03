using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.Test.Models
{
    public class PageTests
    {
        [Fact]
        public void Should_Throw_ValidationError_When_Number_Is_Less_Than_Minimum()
        {
            // Arrange
            var invalidNumber = PageConstants.NumberMin - 1; // Number less than minimum value
            var validSize = PageConstants.SizeMin;
            
            // Act
            Action action = () => new Page((uint)invalidNumber, (uint)validSize);

            // Assert
            action.Should().Throw<ValidationException>();
        }

        [Fact]
        public void Should_Throw_ValidationError_When_Size_Is_Greater_Than_Maximum()
        {
            // Arrange
            var validNumber = PageConstants.NumberMax; 
            var invalidSize = PageConstants.SizeMax + 1; // Size greater than maximum value

            // Act
            Action action = () => new Page((uint)validNumber, (uint)invalidSize);

            // Assert
            action.Should().Throw<ValidationException>();
        }

        [Fact]
        public void Should_Not_Throw_Any_Error_When_Valid_Data_Is_Provided()
        {
            // Arrange
            var validNumber = PageConstants.NumberMin; 
            var validSize = PageConstants.SizeMax; 

            // Act
            Action action = () => new Page((uint)validNumber, (uint)validSize);

            // Assert
            action.Should().NotThrow();
        }
    }
}