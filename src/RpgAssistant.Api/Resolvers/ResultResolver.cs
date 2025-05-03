using System.Net;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Api.Resolvers;

public class ResultResolver
{
    private readonly string _endpointDisplayName;

    /// <summary>
    /// Constructor for the HttpResponseResolver class. Initializes the class with a HTTP context.
    /// </summary>
    public ResultResolver(
        IHttpContextAccessor httpContextAccessorAccessor)
    {
        _endpointDisplayName = (
            httpContextAccessorAccessor.HttpContext is not null &&
            httpContextAccessorAccessor.HttpContext.GetEndpoint() is not null &&
            !string.IsNullOrEmpty(httpContextAccessorAccessor.HttpContext.GetEndpoint()?.DisplayName) ?
                httpContextAccessorAccessor.HttpContext.GetEndpoint()!.DisplayName : string.Empty)!;
    }

    /// <summary>
    /// This function will take a result and resolves it to output IResult.
    /// </summary>
    public IResult GetResult<TPayload>(
        Result<TPayload, Exception> result,
        Func<TPayload, IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke(result.Value);
    }

    /// <summary>
    /// This function will take a result and resolves it to output IResult.
    /// </summary>
    public IResult GetResult(
        Result<Exception> result,
        Func<IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke();
    }

    /// <summary>
    /// This private function takes an Exception as a parameter and returns an IResult according to the type of exception.
    /// This function essentially maps specific exception types to a particular HTTP response.
    /// </summary>
    private IResult GetErrorBadRequest(Exception exception) => exception switch
    {
        ValidateException validationException
            => Results.Problem(
                validationException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.BadRequest,
                validationException.Title,
                validationException.ErrorCode,
                validationException.ValidationErrors!),
        DomainException domainException
            => Results.Problem(
                domainException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.InternalServerError,
                domainException.Title,
                domainException.ErrorCode),
        _ => Results.Problem(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}{exception.Message}",
            _endpointDisplayName,
            (int)HttpStatusCode.InternalServerError,
            "Unexpected error",
            "UnKnow")
    };
}
