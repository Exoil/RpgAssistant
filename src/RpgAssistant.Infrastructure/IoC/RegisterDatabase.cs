using System.Diagnostics;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Neo4j.Driver;

using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Infrastructure.IoC;

public static class RegisterDatabase
{
    private const string _configurationPathToGraphDbConnectionString = "GraphDb:ConnectionString";

    private const string _configurationPathToGraphDbUsername = "GraphDb:Username";

    private const string _configurationPathToGraphDbPassword = "GraphDb:Password";

    public static void RegisterGraphDb(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        Debug.WriteLine($"Registering Neo4j database...{configuration[_configurationPathToGraphDbConnectionString]}");
        serviceCollection.AddSingleton(
            GraphDatabase.Driver(
                configuration[_configurationPathToGraphDbConnectionString],
                AuthTokens.Basic(configuration[_configurationPathToGraphDbUsername],
                    configuration[_configurationPathToGraphDbPassword]),
                config => config.WithEncryptionLevel(EncryptionLevel.None)));

        serviceCollection
            .AddScoped<IAsyncSession>(serviceProvider =>
                serviceProvider.GetRequiredService<IDriver>().AsyncSession())
            .AddScoped<ITransactionFactory<IAsyncTransaction>, TransactionFactory>()
            .AddScoped<ICharacterRepository, CharacterRepository>();
    }
}
