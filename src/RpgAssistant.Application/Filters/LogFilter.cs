using MessagePipe;

using Serilog.Context;

namespace RpgAssistant.Application.Filters;

public class LogFilter<T> : AsyncMessageHandlerFilter<T>
{
    public override async ValueTask HandleAsync(T message, CancellationToken cancellationToken,
        Func<T, CancellationToken, ValueTask> next)
    {
        using (LogContext.PushProperty("MessageType", typeof(T).Name))
        {
            await next(message, cancellationToken);
        }
    }
}
