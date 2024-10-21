using System.Text;

namespace RpgAssistant.Domain.Exceptions;

[Serializable]
public class ValidationException : DomainException
{
    public readonly IDictionary<string, object> ValidationErrors;

    public ValidationException(
        string title,
        string errorCode,
        IList<ValidationMessage> validationMessages)
        : base(title, errorCode, message: GetValidationMessage(validationMessages))
    {
        ValidationErrors = validationMessages.ToDictionary(x => x.PropertyName, y => (object)y.Message);
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