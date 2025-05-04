using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;

using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Models;

namespace RpgAssistant.Domain.Models;

public record BaseValueObject
{
    protected virtual string ModelName { get; } = nameof(BaseValueObject);

    protected void Validate()
    {
        var context = new ValidationContext(this, serviceProvider: null, items: null);
        var validationResults = new List<ValidationResult>();

        if (Validator.TryValidateObject(this, context, validationResults, true))
            return;

        var validationMessages = validationResults
            .Select(x => new ValidationMessage(x.MemberNames.First(), x.ErrorMessage!))
            .ToImmutableList();

        throw new ValidateException(
            "Validation Error.",
            $"Model {ModelName} properties are not valid.",
            validationMessages);
    }
}
