using Microsoft.Extensions.Time.Testing;
using Neo4j.Driver;
using RpgAssistant.Api.Test.Containers;

namespace RpgAssistant.Api.Test;

public abstract class IntegrationTestBase : IAsyncLifetime
{
    protected ApiWebApplicationFactory Factory = default!;
    protected HttpClient Client = default!;
    protected FakeTimeProvider TimeProvider = default!;
    protected Neo4jContainer Neo4jContainer = default!;

    protected IntegrationTestBase()
    {
        Neo4jContainer = new Neo4jContainer();
    }

    public virtual async Task InitializeAsync()
    {
        await Neo4jContainer.InitializeAsync();
        Factory = new ApiWebApplicationFactory(Neo4jContainer);
        Client = Factory.CreateClient();
        TimeProvider = Factory.TimeProvider;
    }

    public virtual async Task DisposeAsync()
        => await Neo4jContainer.ResetAsync();

    protected Task<IDriver> GetDriverAsync() => Task.FromResult(Neo4jContainer.CreateDriver());


    protected void SetCurrentTime(DateTimeOffset time) =>
        TimeProvider.SetUtcNow(time);

    protected void AdvanceTime(TimeSpan timeSpan) =>
        TimeProvider.Advance(timeSpan);
}
