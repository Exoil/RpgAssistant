using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Exceptions;
using ValidationException = RpgAssistant.Domain.Exceptions.ValidationException;

namespace RpgAssistant.Domain.Models;

public record BaseValueObject
{
    protected virtual string ModelName { get; set; } = nameof(BaseValueObject);
    protected readonly IList<ValidationMessage> ValidationMessages = new List<ValidationMessage>();

    protected virtual void Validate()
    {
        ThrowValidationException();
    }

    protected void ThrowValidationException()
    {
        
        var context = new ValidationContext(this, serviceProvider: null, items: null);
        var validationResults = new List<ValidationResult>();
        
        if (!Validator.TryValidateObject(this, context, validationResults, validateAllProperties: true))
        {
            
        }
        
        throw new ValidationException(
            "Validation Error.",
            "Model properties are not valid.",
            ValidationMessages);
    }
    
    protected void ValidateProperty
}