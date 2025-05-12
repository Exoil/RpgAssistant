using Neo4j.Driver;

using Testcontainers.Neo4j;

namespace RpgAssistant.Api.Test.Containers;

public class Neo4jContainerRunner : IAsyncDisposable
{
    private readonly Neo4jContainer _container;

    private bool _isInitialized;

    public string ConnectionString => _container.GetConnectionString();

    public Neo4jContainerRunner()
    {
        _container = new Neo4jBuilder()
            .WithImage("neo4j:latest")
            .WithCleanUp(true)
            .Build();
    }

    public async Task InitializeAsync()
    {
        if (_isInitialized)
            return;

        await _container.StartAsync();

        await using var driver = CreateDriver();
        await using var session = driver.AsyncSession();
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
        await using var driver = CreateDriver();
        await using var session = driver.AsyncSession();
        await session.RunAsync(new Query("MATCH (n) DETACH DELETE n"));
    }

    public IDriver CreateDriver() =>
        GraphDatabase.Driver(
            ConnectionString,
            AuthTokens.None);

    public async ValueTask DisposeAsync()
    {
        if (_container != null)
        {
            await _container.StopAsync();
            await _container.DisposeAsync();
        }
    }
}
