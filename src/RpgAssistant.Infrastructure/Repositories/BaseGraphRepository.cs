using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Repositories;

public class BaseGraphRepository
{
    protected const string DataSourceToCompare = "Neo4j.Driver";
    protected const string DataSourceForThrowException = "Graph.Db";

    protected bool _disposed = false;
    protected readonly IAsyncSession _session;

    protected BaseGraphRepository(IDriver driver)
    {
        _session = _session = driver.AsyncSession();
    }

    public void Dispose()
        => Dispose(true);

    public async ValueTask DisposeAsync()
        => await DisposeAsync(true);
    private void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                _session.Dispose();
            }
        }

        _disposed = true;
    }

    private async Task DisposeAsync(bool disposing)
    {
        if (!_disposed)
        {
            if (disposing)
            {
                await _session.DisposeAsync();
            }
        }

        _disposed = true;
    }
}
