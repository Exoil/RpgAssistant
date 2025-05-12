using Microsoft.Extensions.Time.Testing;
using Neo4j.Driver;
using RpgAssistant.Api.Test.Containers;

namespace RpgAssistant.Api.Test;

public abstract class IntegrationTestBase : IAsyncLifetime
{
    protected ApiWebApplicationFactory Factory = default!;
    protected HttpClient Client = default!;
    protected FakeTimeProvider TimeProvider = default!;
    protected Neo4jContainerRunner _neo4JContainerRunner = default!;

    protected IntegrationTestBase()
    {
        _neo4JContainerRunner = new Neo4jContainerRunner();
    }

    public virtual async Task InitializeAsync()
    {
        await _neo4JContainerRunner.InitializeAsync();
        Factory = new ApiWebApplicationFactory(_neo4JContainerRunner);
        Client = Factory.CreateClient();
        TimeProvider = Factory.TimeProvider;
    }

    public virtual async Task DisposeAsync()
        => await _neo4JContainerRunner.ResetAsync();

    protected Task<IDriver> GetDriverAsync() => Task.FromResult(_neo4JContainerRunner.CreateDriver());


    protected void SetCurrentTime(DateTimeOffset time) =>
        TimeProvider.SetUtcNow(time);

    protected void AdvanceTime(TimeSpan timeSpan) =>
        TimeProvider.Advance(timeSpan);
}
