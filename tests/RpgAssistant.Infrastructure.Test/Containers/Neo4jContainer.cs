using DotNet.Testcontainers.Builders;
using DotNet.Testcontainers.Containers;
using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Test.Containers;

public class Neo4jContainer : IDisposable
{
    public ushort ExposedHttpPort;
    public ushort ExposedBoltPort;
    
    public const string Login = "neo4j";
    public const string Password = "s3cr3ts3cr3t";
    public const string Dbname = "RpgCampaignDb";
    
    public string BoltUri
    {
        get
        {
            return $"neo4j://localhost:{ExposedBoltPort}";
        }
    }
    public IDriver Driver {
        get
        {
            return GraphDatabase.Driver(
                BoltUri,
                AuthTokens.Basic(Login, Password));
        }
    }
    
    private const ushort BoltPort = 7687;
    private const ushort HttpPort = 7474;
    private readonly IContainer _container;
    
    public Neo4jContainer()
    {
        _container =
            new ContainerBuilder()
                .WithImage("neo4j:latest")
                .WithEnvironment("NEO4J_AUTH", $"{Login}/{Password}")
                .WithEnvironment("NEO4J_initial_dbms_default__database",$"{Dbname}")
                .WithEnvironment("NEO4J_server_http_listen__address", $":{HttpPort}")
                .WithEnvironment("NEO4J_server_http_advertised__address", $":{HttpPort}")
                .WithEnvironment("NEO4J_server_http_enabled", "true")
                .WithEnvironment("NEO4J_server_bolt_advertised__address", $":{BoltPort}")
                .WithEnvironment("NEO4J_server_bolt_listen__address", $":{BoltPort}")
                .WithEnvironment("NEO4J_server_bolt_enabled", $"true")
                .WithEnvironment("NEO4J_ACCEPT_LICENSE_AGREEMENT", $"yes")
                .WithEnvironment("NEO4J_dbms_ssl_policy_bolt_client__auth", $"NONE")
                .WithEnvironment("NEO4J_dbms_ssl_policy_https_client__auth", $"NONE")
                .WithPortBinding(HttpPort, true)
                .WithPortBinding(BoltPort, true)
                .WithWaitStrategy(Wait.ForUnixContainer().UntilHttpRequestIsSucceeded(request =>
                    request.ForPath("/").ForPort(HttpPort)))
                .Build();
        Task.Run(InitializeAsync).Wait();
    }
    public async Task InitializeAsync()
    {
        await _container.StartAsync();
        ExposedHttpPort = _container.GetMappedPublicPort(HttpPort);
        ExposedBoltPort = _container.GetMappedPublicPort(BoltPort);
        
        await using var driver = Driver;

        await using var session = driver.AsyncSession();
        await using var transactionAsync = await session.BeginTransactionAsync();
        await SetConstantsAsync(transactionAsync);
    }

    private async Task SetConstantsAsync(IAsyncTransaction transaction)
    {
        await transaction.RunAsync(new Query(
            "CREATE CONSTRAINT character_UQ_characterid FOR (ch:Character) REQUIRE ch.Id IS UNIQUE"));
    }
    
    public async Task ResetAsync()
    {
        await using var driver = Driver;

        await using var session = driver.AsyncSession();

        await session.RunAsync(new Query("MATCH (n) DETACH DELETE n"));
    }
    
    public void Dispose()
    { 
        Task.Run(() => _container.StopAsync()).Wait();
    }
}