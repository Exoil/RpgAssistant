namespace RpgAssistant.Domain.Exceptions;

public class NotFoundException : DomainException
{
    public NotFoundException(Enums.Entities entity)
        : base( "Not found error", "NotFoundException", GetNotFoundMessage(entity))
    {
    }

    private static string GetNotFoundMessage(Enums.Entities entity) => $"Not found {entity.ToString()}.";
}
