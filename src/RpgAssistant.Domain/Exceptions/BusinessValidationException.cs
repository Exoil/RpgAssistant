namespace RpgAssistant.Domain.Exceptions;

public class BusinessValidationException : DomainException
{
    public string EntityTypeName { get; init; }

    public BusinessValidationException(string entityTypeName, string message)
        : base("Business validation exception", message)
    {
        EntityTypeName = entityTypeName;
    }
}