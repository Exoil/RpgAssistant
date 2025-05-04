using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Neo4j.Driver;

using RpgAssistant.Infrastructure.IoC.HealthChecks;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Infrastructure.IoC;

public static class InfrastructureRegisters
{
    private const string PathToConnectionString = "GraphDb:Uri";
    private const string PathToUserName = "GraphDb:Login";
    private const string PathToPassword = "GraphDb:Pass";
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration) =>
        services
            .AddDataSourceConnection(configuration)
            .AddRepositories();

    public static IHealthChecksBuilder AddInfrastructureHealthChecks(this IHealthChecksBuilder healthChecks)
        => healthChecks.AddCheck<GraphDbHealthCheck>(PathToConnectionString);

    private static IServiceCollection AddRepositories(this IServiceCollection services)
        => services.AddScoped<UtilityGraphRepository>();

    private static IServiceCollection AddDataSourceConnection(
        this IServiceCollection services,
        IConfiguration configuration) =>
        services.AddSingleton(
            GraphDatabase.Driver(
                PathToConnectionString,
                AuthTokens.Basic(
                    PathToUserName,
                    PathToPassword),
                config => config.WithEncryptionLevel(EncryptionLevel.None)));
}
