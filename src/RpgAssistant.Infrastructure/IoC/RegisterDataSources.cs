using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Neo4j.Driver;
using RpgAssistant.Infrastructure.IRepositories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Infrastructure.IoC;

public static class RegisterDataSources
{
    public static void RegisterDbNeo4j(this IServiceCollection serviceCollection, IConfiguration configuration)
    {
        serviceCollection.AddSingleton(
            GraphDatabase.Driver(
                configuration["GraphDb:Uri"],
                AuthTokens.Basic(configuration["GraphDb:Login"], configuration["GraphDb:Pass"]),
                config => config.WithEncryptionLevel(EncryptionLevel.None)));
    }

    public static void RegisterRepositories(this IServiceCollection serviceCollection)
    {
        serviceCollection.AddScoped<ICharacterRepository, CharacterRepository>();
    }
}