using RpgAssistant.Application.IoC;

namespace RpgAssistant.Api.IoC;

public static class ApiServiceRegisters
{
    public static void RegisterApi(this IServiceCollection serviceCollection)
    {
        serviceCollection.RegisterMediator();
    }

    public static void SetCors(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddCors(co =>
        {
            co.AddDefaultPolicy(options =>
            {
                options
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
    }
}