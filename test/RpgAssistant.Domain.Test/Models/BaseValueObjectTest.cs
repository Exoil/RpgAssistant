using System.ComponentModel.DataAnnotations;
using FluentAssertions;
using RpgAssistant.Domain.Models;
using ValidationException = RpgAssistant.Domain.Exceptions.ValidationException;

namespace RpgAssistant.Domain.Test.Models;

[Trait(Constants.TraitName,Constants.TestTitle)]
public class BaseValueObjectTest
{
    private const string ErrorTitle = "Validation Error.";
    private const string ErrorMessage = $"Model {nameof(FooValueObject)} properties are not valid.";

    [Fact]
    public void CreateNotValidObject_Throw_Validation_Exception()
    {
        var act = () => new FooValueObject(
            11,
            new string('*', 100),
            new DateTimeOffset(2030, 1,1,12,12,12, TimeSpan.Zero));

        act.Should().ThrowExactly<ValidationException>();

        ValidationException validationException = null!;

        try
        {
            _ = new FooValueObject(
                11,
                new string('*', 100),
                new DateTimeOffset(2030, 1, 1, 12, 12, 12, TimeSpan.Zero));
        }
        catch (ValidationException ve)
        {
            validationException = ve;
        }

        validationException.Title.Should().Be(ErrorTitle);
        validationException.ErrorCode.Should().Be(ErrorMessage);
        validationException.ValidationErrors.Should().NotBeNullOrEmpty();

        validationException.ValidationErrors.TryGetValue(nameof(FooValueObject.NumberSample), out _).Should().BeTrue();
        validationException.ValidationErrors.TryGetValue(nameof(FooValueObject.TextSample), out _).Should().BeTrue();
        validationException.ValidationErrors.TryGetValue(nameof(FooValueObject.DateTimeOffsetSample), out _).Should().BeTrue();
    }
}


public record FooValueObject : BaseValueObject
{
    protected override string ModelName { get; } = nameof(FooValueObject);
    
    [Range(minimum: 1, maximum: 10, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
    public int NumberSample { get; }
    
    [StringLength(10, MinimumLength = 1, ErrorMessage = "Value for {0} must be between {1} and {2} characters.")]
    public string TextSample { get; }
    
    [Range(typeof(DateTimeOffset), "1/2/2004", "3/4/2004", ErrorMessage = "Value for {0} must be between {1} and {2}")]
    public DateTimeOffset DateTimeOffsetSample { get; }

    public FooValueObject(int numberSample, string textSample, DateTimeOffset dateTimeOffset)
    {
        NumberSample = numberSample;
        TextSample = textSample;
        DateTimeOffsetSample = dateTimeOffset;
        
        Validate();
    }
}