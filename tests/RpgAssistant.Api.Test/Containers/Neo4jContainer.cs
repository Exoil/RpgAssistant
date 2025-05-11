// RpgAssistant.Api.Test/Containers/Neo4jContainer.cs
using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using Neo4j.Driver;

namespace RpgAssistant.Api.Test.Containers;

public class Neo4jContainer : IAsyncDisposable
{
    public ushort ExposedHttpPort { get; private set; }
    public ushort ExposedBoltPort { get; private set; }

    public const string Login = "neo4j";
    public const string Password = "s3cr3ts3cr3t";
    public const string Dbname = "RpgCampaignDb";

    public string BoltUri => $"neo4j://localhost:{ExposedBoltPort}";

    private readonly IDriver _driver;
    private readonly IContainer _container;
    private bool _isInitialized = false;

    public Neo4jContainer()
    {
        const ushort boltPort = 7687;
        const ushort httpPort = 7474;

        _container = new ContainerBuilder()
            .WithImage("neo4j:latest")
            .WithEnvironment("NEO4J_AUTH", $"{Login}/{Password}")
            .WithEnvironment("NEO4J_initial_dbms_default__database", Dbname)
            .WithEnvironment("NEO4J_server_http_listen__address", $":{httpPort}")
            .WithEnvironment("NEO4J_server_http_advertised__address", $":{httpPort}")
            .WithEnvironment("NEO4J_server_http_enabled", "true")
            .WithEnvironment("NEO4J_server_bolt_advertised__address", $":{boltPort}")
            .WithEnvironment("NEO4J_server_bolt_listen__address", $":{boltPort}")
            .WithEnvironment("NEO4J_server_bolt_enabled", "true")
            .WithEnvironment("NEO4J_ACCEPT_LICENSE_AGREEMENT", "yes")
            .WithEnvironment("NEO4J_dbms_ssl_policy_bolt_client__auth", "NONE")
            .WithEnvironment("NEO4J_dbms_ssl_policy_https_client__auth", "NONE")
            .WithPortBinding(httpPort, true)
            .WithPortBinding(boltPort, true)
            .WithWaitStrategy(Wait.ForUnixContainer().UntilHttpRequestIsSucceeded(request =>
                request.ForPath("/").ForPort(httpPort)))
            .Build();

        _driver = GraphDatabase.Driver(
            BoltUri,
            AuthTokens.Basic(Login, Password));
    }

    public async Task InitializeAsync()
    {
        if (_isInitialized)
            return;

        await _container.StartAsync();

        ExposedHttpPort = _container.GetMappedPublicPort(7474);
        ExposedBoltPort = _container.GetMappedPublicPort(7687);

        await using var session = _driver.AsyncSession();
        await using var transaction = await session.BeginTransactionAsync();

        await SetConstraintsAsync(transaction);
        await transaction.CommitAsync();

        _isInitialized = true;
    }

    private async Task SetConstraintsAsync(IAsyncTransaction transaction)
    {
        await transaction.RunAsync(new Query(
            "CREATE CONSTRAINT character_UQ_characterid FOR (ch:Character) REQUIRE ch.Id IS UNIQUE"));
    }

    public async Task ResetAsync()
    {
        await using var session = _driver.AsyncSession();
        await session.RunAsync(new Query("MATCH (n) DETACH DELETE n"));
    }

    public IDriver CreateDriver()
    {
        return GraphDatabase.Driver(
            BoltUri,
            AuthTokens.Basic(Login, Password));
    }

    public async ValueTask DisposeAsync()
    {
        if (_driver != null)
        {
            await _driver.DisposeAsync();
        }

        if (_container != null)
        {
            await _container.StopAsync();
            await _container.DisposeAsync();
        }
    }
}
