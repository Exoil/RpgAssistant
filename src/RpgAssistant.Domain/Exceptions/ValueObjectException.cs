using System.Text;

namespace RpgAssistant.Domain.Exceptions;

public class ValueObjectException : DomainException
{
    public readonly IDictionary<string, object> ValidationErrors;

    public ValueObjectException(
        string title,
        string errorCode,
        IList<ValidationMessage> validationMessages)
        : base(title, errorCode, GetValidationMessage(validationMessages)) =>
        ValidationErrors = validationMessages.ToDictionary(x => x.PropertyName, y => (object)y.Message);

    private static string GetValidationMessage(IList<ValidationMessage> validationMessages)
    {
        var stringBuilder = new StringBuilder("Value object exception occured:");

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

public record ValidationMessage(string PropertyName, string Message);
