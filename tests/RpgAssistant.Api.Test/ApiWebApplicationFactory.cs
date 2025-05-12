using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Time.Testing;
using Neo4j.Driver;
using RpgAssistant.Api.Test.Containers;

using Microsoft.Extensions.DependencyInjection.Extensions;

namespace RpgAssistant.Api.Test;

public class ApiWebApplicationFactory : WebApplicationFactory<Program>
{
    private readonly Neo4jContainer _neo4jContainer;
    private readonly FakeTimeProvider _timeProvider;
    public FakeTimeProvider TimeProvider => _timeProvider;

    public ApiWebApplicationFactory(Neo4jContainer neo4jContainer)
    {
        _neo4jContainer = neo4jContainer;
        _timeProvider = new FakeTimeProvider();
        _timeProvider.SetUtcNow(new DateTimeOffset(2023, 1, 1, 12, 0, 0, TimeSpan.Zero));
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((context, config) =>
        {
            // Add test-specific configuration
            config.AddJsonFile("appsettings.Testing.json", optional: true);

            // Override settings with test container values
            var inMemorySettings = new Dictionary<string, string>
            {
                {"GraphDb:Uri", _neo4jContainer.BoltUri},
                {"GraphDb:Login", Neo4jContainer.Login},
                {"GraphDb:Pass", Neo4jContainer.Password}
            };

            config.AddInMemoryCollection(inMemorySettings!);
        });

        builder.ConfigureServices(services =>
        {
            // Replace the TimeProvider
            services.RemoveAll<TimeProvider>();
            services.AddSingleton<TimeProvider>(_timeProvider);

            // Replace Neo4j driver with our test container driver
            services.RemoveAll<IDriver>();
            services.AddSingleton(_neo4jContainer.CreateDriver());
        });
    }

    public override async ValueTask DisposeAsync()
    {
        await _neo4jContainer.DisposeAsync();
        await base.DisposeAsync();
    }
}
