using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;

using LoreWeave.Domain.Exceptions;

namespace LoreWeave.Domain.Models;

public record BaseValueObject
{
    protected virtual string ModelName { get; } = nameof(BaseValueObject);

    protected void Validate()
    {
        var context = new ValidationContext(this, null, null);
        var validationResults = new List<ValidationResult>();

        if (Validator.TryValidateObject(this, context, validationResults, true))
        {
            return;
        }

        var validationMessages = validationResults
            .Select(x => new ValidationMessage(x.MemberNames.First(), x.ErrorMessage!))
            .ToImmutableList();

        throw new ValueObjectException(
            "Value object error.",
            $"Model {ModelName} properties are not valid.",
            validationMessages);
    }
}
