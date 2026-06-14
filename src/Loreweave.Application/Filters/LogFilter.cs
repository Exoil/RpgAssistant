using MessagePipe;

using Serilog;
using Serilog.Context;

namespace Loreweave.Application.Filters;

public class LogFilter<TRequest, TResponse>: AsyncRequestHandlerFilter<TRequest, TResponse>
{
    private const string RequestHandlerTypePropertyName = "Handler";
    private const string RequestTypePropertyName = "Command/Query Type";

    private readonly ILogger _logger;

    public LogFilter(ILogger logger)
    {
        _logger = logger;
    }

    public override async ValueTask<TResponse> InvokeAsync(
        TRequest request,
        CancellationToken cancellationToken,
        Func<TRequest, CancellationToken, ValueTask<TResponse>> next)
    {
        using (LogContext.PushProperty(RequestHandlerTypePropertyName, typeof(TRequest).Name))
        using (LogContext.PushProperty(RequestTypePropertyName, typeof(TRequest).Name))
        {
            _logger.Debug("Start handle request");
            var response = await next(request, cancellationToken);
            _logger.Debug("Finish handle request");

            return response;
        }

    }
}
