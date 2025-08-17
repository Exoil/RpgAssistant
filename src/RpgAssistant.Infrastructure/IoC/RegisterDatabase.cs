using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.IoC;

public static class RegisterDatabase
{
    private const string _configurationPathToGraphDbConnectionString = "GraphDb:ConnectionString";

    private const string _configurationPathToGraphDbUsername = "GraphDb:Username";

    private const string _configurationPathToGraphDbPassword = "GraphDb:Password";

    public static void RegisterGraphDb(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddSingleton(
            GraphDatabase.Driver(
                configuration[_configurationPathToGraphDbConnectionString],
                AuthTokens.Basic(configuration[_configurationPathToGraphDbUsername],
                    configuration[_configurationPathToGraphDbPassword]),
                config => config.WithEncryptionLevel(EncryptionLevel.None)));

        serviceCollection.AddScoped<IAsyncSession>(serviceProvider =>
            serviceProvider.GetRequiredService<IDriver>().AsyncSession());
    }
}
