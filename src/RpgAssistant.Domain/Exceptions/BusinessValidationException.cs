namespace RpgAssistant.Domain.Exceptions;

public class BusinessValidationException : DomainException
{
    public string EntityTypeName { get; init; }

    public BusinessValidationException(string entityTypeName, string errorCode, string message)
        : base("Business validation exception", errorCode, message)
    {
        EntityTypeName = entityTypeName;
    }
}