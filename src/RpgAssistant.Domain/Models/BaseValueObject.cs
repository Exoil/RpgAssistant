using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Domain.Models;

public record BaseValueObject
{
    protected readonly string ModelName = nameof(BaseValueObject);
    protected readonly IList<ValidationMessage> ValidationMessages;

    protected BaseValueObject()
    {
        ValidationMessages = new List<ValidationMessage>();
    }

    protected void Validate()
    {
        ThrowValidationException();
    }

    protected void ThrowValidationException()
    {
        if (!ValidationMessages.Any())
            return;

        throw new ValidationException(
            "Validation Error.",
            "Model properties are not valid.",
            ValidationMessages);
    }
}