using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Domain.Models;

public record BaseValueObject
{
    protected readonly string ModelName = nameof(BaseValueObject);
    protected readonly IList<ValidationMessage> _validationMessages;

    protected BaseValueObject()
    {
        _validationMessages = new List<ValidationMessage>();
    }

    protected void Validate()
    {
        ThrowValidationException();
    }

    protected void ThrowValidationException()
    {
        if (!_validationMessages.Any())
            return;

        throw new ValidationException(
            "Validation Error.",
            "Model properties are not valid.",
            _validationMessages);
    }
}