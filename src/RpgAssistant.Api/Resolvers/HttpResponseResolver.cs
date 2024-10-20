using System.Net;
using MediatR;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Api.Resolvers;

/// <summary>
/// The HttpResponseResolver class is responsible for managing HTTP responses. It has methods to handle the results 
/// of requests and appropriately shape the HTTP responses. The class uses the Mediator pattern and error-handling through exceptions.
/// </summary>
public class HttpResponseResolver : IResponseResolver
{
    private readonly ISender _sender;
    private readonly string _endpointDisplayName;
    public bool LastResponseIsSuccess { get; set; }

    /// <summary>
    /// Constructor for the HttpResponseResolver class. Initializes the class with a sender (mediator) and HTTP context.
    /// </summary>
    public HttpResponseResolver(
        IMediator sender,
        IHttpContextAccessor httpContextAccessorAccessor)
    {
        _sender = sender;
        _endpointDisplayName = (
            httpContextAccessorAccessor.HttpContext is not null && 
            httpContextAccessorAccessor.HttpContext.GetEndpoint() is not null &&
            !string.IsNullOrEmpty(httpContextAccessorAccessor.HttpContext.GetEndpoint()?.DisplayName) ?
                httpContextAccessorAccessor.HttpContext.GetEndpoint()!.DisplayName : string.Empty)!;
    }

    /// <summary>
    /// This function will take a request, and a function to transform the request’s payload into a result. 
    /// It will then use a sender to send the request and call the provided function on the result to get an IResult object.
    /// </summary>
    public async Task<IResult> GetResult<TPayload>(
        IRequest<Result<TPayload, Exception>> request,
        Func<TPayload, IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        var result = await _sender.Send(request, cancellationToken);
        LastResponseIsSuccess = result.IsSuccess;

        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke(result.Value);
    }

    /// <summary>
    /// This function will take a request, and a function to transform the request’s payload into a result. 
    /// It will then use a sender to send the request and call the provided function on the result to get an IResult object.
    /// </summary>
    public async Task<IResult> GetResult(
        IRequest<Result<Exception>> request,
        Func<IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        var result = await _sender.Send(request, cancellationToken);
        LastResponseIsSuccess = result.IsSuccess;

        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke();
    }

    /// <summary>
    /// This private function takes an Exception as a parameter and returns an IResult according to the type of exception. 
    /// This function essentially maps specific exception types to a particular HTTP response.
    /// </summary>
    private IResult GetErrorBadRequest(Exception exception) => exception switch
    {
        ValidationException validationException
            => Results.Problem(
                validationException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.BadRequest,
                validationException.Title,
                validationException.ErrorCode),
        BusinessValidationException businessValidationException
            => Results.Problem(
                businessValidationException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.UnprocessableEntity,
                businessValidationException.Title,
                businessValidationException.ErrorCode),
        NotFoundException notFoundException
            => Results.Problem(
                notFoundException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.NotFound,
                notFoundException.Title),
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
            "Unknow")
    };
}