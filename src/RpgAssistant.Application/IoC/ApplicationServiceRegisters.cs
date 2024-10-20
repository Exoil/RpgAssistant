using Microsoft.Extensions.DependencyInjection;

namespace RpgAssistant.Application.IoC;

public static class ApplicationServiceRegisters
{
    public static void RegisterMediator(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddMediatR(
            configuration =>
                configuration
                    .RegisterServicesFromAssembly(typeof(ApplicationServiceRegisters).Assembly));
    }
}