using MessagePipe;

namespace RpgAssistant.Application.IoC;

public static class HandlerConfiguration
{
    public static IServiceCollection RegisterHandlers(this IServiceCollection services)
    {
        services.AddMessagePipe(options =>
        {
            options.InstanceLifetime = InstanceLifetime.Scoped;
            options.RequestHandlerLifetime = InstanceLifetime.Scoped;
        });

        return services;
    }
}
