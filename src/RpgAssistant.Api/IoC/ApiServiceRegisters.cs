using RpgAssistant.Application.IoC;

namespace RpgAssistant.Api.IoC;

public static class ApiServiceRegisters
{
    public static void RegisterApi(this IServiceCollection serviceCollection)
    {
        serviceCollection.RegisterMediator();
    }
}