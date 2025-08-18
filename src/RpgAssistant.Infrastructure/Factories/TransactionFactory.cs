using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Factories;

public class TransactionFactory
{
    private IAsyncSession _session;

    public TransactionFactory(IAsyncSession session)
    {
        _session = session;
    }

    public Task<IAsyncTransaction> CreateAsync() => _session.BeginTransactionAsync();
}
