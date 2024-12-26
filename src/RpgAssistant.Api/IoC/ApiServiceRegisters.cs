using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.IoC;
using RpgAssistant.Infrastructure.IoC;
using Serilog;

namespace RpgAssistant.Api.IoC;

public static class ApiServiceRegisters
{
    public static void RegisterApi(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.RegisterMediator();
        try
        {
            serviceCollection.RegisterDbNeo4j(configuration);
        }
        catch (Exception ex)
        {
            Log.Error(ex, "Error registering Neo4j");
        }

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