using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Time.Testing;

using Neo4j.Driver;

using RpgAssistant.Api.Integration.Test.Containers;

using SutProgram = RpgAssistant.Api.Program;

namespace RpgAssistant.Api.Integration.Test;

public class ApiWebApplicationFactory : WebApplicationFactory<SutProgram>
{
    private readonly Neo4jContainerRunner _neo4JContainerRunner;

    public ApiWebApplicationFactory(Neo4jContainerRunner neo4JContainerRunner)
    {
        _neo4JContainerRunner = neo4JContainerRunner;
        TimeProvider = new FakeTimeProvider();
        TimeProvider.SetUtcNow(new DateTimeOffset(2023, 1, 1, 12, 0, 0, TimeSpan.Zero));
    }

    public FakeTimeProvider TimeProvider { get; }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");

        builder.ConfigureAppConfiguration((context, config) =>
        {
            // Add test-specific configuration
            config.AddJsonFile("appsettings.Testing.json", true);

            // Override settings with test container values
            var inMemorySettings = new Dictionary<string, string>
            {
                {
                    "GraphDb:ConnectionString", _neo4JContainerRunner.ConnectionString.Replace("neo4j","bolt")
                },
                {
                    "GraphDb:Username", "foo"
                },
                {
                    "GraphDb:Password", "foo"
                }
            };

            config.AddInMemoryCollection(inMemorySettings!);
        });

        builder.ConfigureServices(services =>
        {
            // Replace the TimeProvider
            services.RemoveAll<TimeProvider>();
            services.AddSingleton<TimeProvider>(TimeProvider);

            // Replace Neo4j driver with our test container driver
            services.RemoveAll<IDriver>();
            services.AddSingleton(_neo4JContainerRunner.CreateDriver());
        });
    }

    public override async ValueTask DisposeAsync()
    {
        await _neo4JContainerRunner.DisposeAsync();
        await base.DisposeAsync();
    }
}
