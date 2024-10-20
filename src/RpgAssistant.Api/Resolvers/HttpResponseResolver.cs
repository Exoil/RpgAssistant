using System.Net;
using MediatR;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;
using ValidationException = System.ComponentModel.DataAnnotations.ValidationException;

namespace RpgAssistant.Api.Resolvers;

public class HttpResponseResolver : IResponseResolver
{
    private readonly ISender _sender;
    private readonly string _endpointDisplayName;
    public bool LastResponseIsSuccess { get; set; }

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

    public async Task<IResult> GetResult<TPayload>(
        IRequest<Result<TPayload, Exception>> request,
        Func<TPayload, IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        var result = await _sender.Send(request, cancellationToken);
        LastResponseIsSuccess = result.IsSuccess;

        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke(result.Value);
    }
    
    public async Task<IResult> GetResult(
        IRequest<Result<Exception>> request,
        Func<IResult> resultFunc,
        CancellationToken cancellationToken = default)
    {
        var result = await _sender.Send(request, cancellationToken);
        LastResponseIsSuccess = result.IsSuccess;

        return !result.IsSuccess ? GetErrorBadRequest(result.Error!) : resultFunc.Invoke();
    }

    private IResult GetErrorBadRequest(Exception exception) => exception switch
    {
        ValidationException notValidationException
            => Results.Problem(
                notValidationException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.BadRequest,
                notValidationException.Title),
        BusinessValidationException businessValidationException
            => Results.Problem(
                businessValidationException.Message,
                _endpointDisplayName,
                (int)HttpStatusCode.UnprocessableEntity,
                businessValidationException.Title),
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
                domainException.Title),
        _ => Results.Problem(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}{exception.Message}",
            _endpointDisplayName,
            (int)HttpStatusCode.InternalServerError,
            "Unexpected error")
    };
}