namespace RpgAssistant.Domain.Exceptions;

public class NotFoundException : Exception
{
    public NotFoundException(Enums.Entities entity)
        : base(GetNotFoundMessage(entity))
    {

    }

    private static string GetNotFoundMessage(Enums.Entities entity) => $"Not found {entity.ToString()}.";
}
