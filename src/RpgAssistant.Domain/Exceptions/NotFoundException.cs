namespace RpgAssistant.Domain.Exceptions;

[Serializable]
public class NotFoundException : DomainException
{
    public string EntityTypeName { get; init; }
    public new string Source { get; init; }
    public NotFoundException(string entityTypeName, string errorCode, string source)
        : base("Not found entity.", errorCode,  $"Not found an entity {entityTypeName}.")
    {
        EntityTypeName = entityTypeName;
        Source = source;
    }
}