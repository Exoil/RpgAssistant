namespace RpgAssistant.Domain.Exceptions;

public class DomainException : Exception
{
    public readonly string Title;

    public readonly string ErrorCode;

    public int StatusCode { get; private set; } = 500;

    public DomainException(string title, string errorCode,  string message)
        : base(message, null)
    {
        Title = title;
        ErrorCode = errorCode;
    }

    public DomainException(string title, string errorCode, string message, int statusCode)
        : base(message,  null)
    {
        Title = title;
        StatusCode = statusCode;
        ErrorCode = errorCode;
    }
}
