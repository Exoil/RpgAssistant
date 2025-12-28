using Neo4j.Driver;

using RpgAssistant.Domain.Factories;

namespace RpgAssistant.Infrastructure.Factories;

public class TransactionFactory : ITransactionFactory<IAsyncTransaction>
{
    private IAsyncSession _session;
    private bool _disposed;

    public TransactionFactory(IAsyncSession session)
    {
        _session = session;
    }

    public Task<IAsyncTransaction> CreateAsync()
    {
        if (_disposed)
        {
            throw new ObjectDisposedException(nameof(TransactionFactory));
        }

        return _session.BeginTransactionAsync();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    public async ValueTask DisposeAsync()
    {
        await DisposeAsync(true).ConfigureAwait(false);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            _session.Dispose();
            _session = null!;
        }

        _disposed = true;
    }

    protected virtual async ValueTask DisposeAsync(bool disposing)
    {
        if (_disposed)
        {
            return;
        }

        if (disposing)
        {
            await _session.DisposeAsync();
            _session = null!;
        }

        _disposed = true;
    }
}
