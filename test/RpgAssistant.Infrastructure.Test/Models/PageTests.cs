using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.Models;
using FluentAssertions;

namespace RpgAssistant.Infrastructure.Test.Models;

public class PageTests
{
    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
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
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
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