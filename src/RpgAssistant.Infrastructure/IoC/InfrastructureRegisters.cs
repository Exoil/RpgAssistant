using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Neo4j.Driver;

using RpgAssistant.Infrastructure.IoC.HealthChecks;

namespace RpgAssistant.Infrastructure.IoC;

public static class InfrastructureRegisters
{

    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration) =>
        services
            .AddDataSourceConnection(configuration)
            .AddRepositories();

    public static IHealthChecksBuilder AddInfrastructureHealthChecks(this IHealthChecksBuilder healthChecks)
    {
        return healthChecks.AddCheck<GraphDbHealthCheck>("GraphDb");
    }

    private static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        return services;
    }

    private static IServiceCollection AddDataSourceConnection(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        return services.AddSingleton(
            GraphDatabase.Driver(
                configuration["GraphDb:Uri"],
                AuthTokens.Basic(
                    configuration["GraphDb:Login"],
                    configuration["GraphDb:Pass"]),
                config => config.WithEncryptionLevel(EncryptionLevel.None)));
    }
}
