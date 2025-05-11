using Microsoft.Extensions.Time.Testing;
using Neo4j.Driver;
using RpgAssistant.Api.Test.Containers;

namespace RpgAssistant.Api.Test;

public abstract class IntegrationTestBase : IAsyncLifetime
{
    protected readonly ApiWebApplicationFactory Factory;
    protected readonly HttpClient Client;
    protected readonly FakeTimeProvider TimeProvider;
    protected readonly Neo4jContainer Neo4jContainer;

    protected IntegrationTestBase()
    {
        Factory = new ApiWebApplicationFactory();
        Client = Factory.CreateClient();
        TimeProvider = Factory.TimeProvider;
        Neo4jContainer = Factory.Neo4jContainer;
    }

    public virtual async Task InitializeAsync()
        => await Neo4jContainer.InitializeAsync();

    public virtual async Task DisposeAsync()
        => await Neo4jContainer.ResetAsync();

    protected Task<IDriver> GetDriverAsync() => Task.FromResult(Neo4jContainer.CreateDriver());


    protected void SetCurrentTime(DateTimeOffset time) =>
        TimeProvider.SetUtcNow(time);

    protected void AdvanceTime(TimeSpan timeSpan) =>
        TimeProvider.Advance(timeSpan);
}
