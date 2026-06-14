namespace LoreWeave.Domain.Factories;

public interface ITransactionFactory<T> : IAsyncDisposable, IDisposable
{
    Task<T> CreateAsync();
}
