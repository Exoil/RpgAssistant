using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.IoC;
using RpgAssistant.Infrastructure.IoC;

namespace RpgAssistant.Api.IoC;

public static class ApiServiceRegisters
{
    public static void RegisterApi(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.RegisterMediator();
        serviceCollection.RegisterDbNeo4j(configuration);
        serviceCollection.RegisterRepositories();
        serviceCollection.RegisterResponseResolver();
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

    private static void RegisterResponseResolver(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<IResponseResolver, HttpResponseResolver>();
    }
}