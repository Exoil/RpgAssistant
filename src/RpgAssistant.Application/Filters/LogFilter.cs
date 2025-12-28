using MessagePipe;

using Serilog;
using Serilog.Context;

namespace RpgAssistant.Application.Filters;

public class LogFilter<T> : AsyncMessageHandlerFilter<T>
{
    private const string MessageTypePropertyName = "Command/Query Type";

    private readonly ILogger _logger;

    public LogFilter(ILogger logger)
    {
        _logger = logger;
    }

    public override async ValueTask HandleAsync(T message, CancellationToken cancellationToken,
        Func<T, CancellationToken, ValueTask> next)
    {
        using (LogContext.PushProperty(MessageTypePropertyName, typeof(T).Name))
        {
            _logger.Debug("Start handle message");
            await next(message, cancellationToken);
            _logger.Debug("Finish handle message");
        }
    }
}
