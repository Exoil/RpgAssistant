using System.Text;

namespace RpgAssistant.Domain.Exceptions;

[Serializable]
public class ValidationException : DomainException
{
    public ValidationException(
        string title,
        IList<ValidationMessage> validationMessages)
        : base(title, message: GetValidationMessage(validationMessages))
    {
    }

    private static string GetValidationMessage(IList<ValidationMessage> validationMessages)
    {
        var stringBuilder = new StringBuilder($"Validation exception occured:");

        foreach (var validationMessage in validationMessages)
        {
            stringBuilder
                .AppendLine()
                .Append(
                    $"Property: {validationMessage.PropertyName}, validation message: {validationMessage.Message}.");
        }

        return stringBuilder.ToString();
    }
}