using MediatR;
using RpgAssistant.Application.Models;

namespace RpgAssistant.Api.Resolvers;

public interface IResponseResolver
{
    bool LastResponseIsSuccess { get;  set; }
    Task<IResult> GetResult<TPayload>(
        IRequest<Result<TPayload, Exception>> request,
        Func<TPayload, IResult> resultFunc,
        CancellationToken cancellationToken = default);

    Task<IResult> GetResult(
        IRequest<Result<Exception>> request,
        Func<IResult> resultFunc,
        CancellationToken cancellationToken = default);
}