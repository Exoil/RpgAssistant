using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Application.ResultResolvers;

public static class ExceptionExtensions
{
    public static IResult ToResult(this Exception exception, string endpointDisplayName)
    {
        var domainException = new DomainException(exception);

        return Results.Problem(
            domainException.Message,
            endpointDisplayName,
            domainException.StatusCode,
            domainException.Title,
            domainException.ErrorCode);
    }
}
