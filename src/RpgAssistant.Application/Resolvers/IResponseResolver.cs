namespace RpgAssistant.Application.Resolvers;

/// <summary>
/// The IResponseResolver interface establishes a contract for classes that need to manage HTTP responses.
/// It defines properties and methods that these classes should implement.
/// </summary>
public interface IResponseResolver<in TInput, TOutput>
{
    /// <summary>
    /// A boolean property to track if the last response was successful.
    /// </summary>
    bool LastResponseIsSuccess { get; set; }

    /// <summary>
    /// Method to process a request with a specific payload and transform it into a result.
    /// Given the request and a function to use the payload to generate a result, the method will
    /// perform the request, transform the payload and return a result.
    /// </summary>
    Task<TOutput> GetResult<TPayload>(
        TInput request,
        Func<TPayload, TOutput> resultFunc,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Method to process a request and use a function to generate a result. Given the request and
    /// a function, the method will perform the request and return a result.
    /// </summary>
    Task<TOutput> GetResult(
        TInput request,
        Func<TOutput> resultFunc,
        CancellationToken cancellationToken = default);
}
