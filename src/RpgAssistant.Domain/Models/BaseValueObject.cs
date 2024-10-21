using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Exceptions;
using ValidationException = RpgAssistant.Domain.Exceptions.ValidationException;

namespace RpgAssistant.Domain.Models;

public record BaseValueObject
{ 
    protected virtual string ModelName { get; set; } = nameof(BaseValueObject);

    protected virtual void Validate()
    {
        ThrowValidationException();
    }

    protected void ThrowValidationException()
    {
        
        var context = new ValidationContext(this, serviceProvider: null, items: null);
        var validationResults = new List<ValidationResult>();

        if (Validator.TryValidateObject(this, context, validationResults, validateAllProperties: true)) 
            return;

        var validationMessages = validationResults
            .Select(x => new ValidationMessage(x.MemberNames.First(), x.ErrorMessage!))
            .ToImmutableList();
            
        throw new ValidationException(
            "Validation Error.",
            $"Model {ModelName} properties are not valid.",
            validationMessages);
    }
}