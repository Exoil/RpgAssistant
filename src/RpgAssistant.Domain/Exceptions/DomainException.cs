namespace RpgAssistant.Domain.Exceptions;

public class DomainException : Exception
{
    public readonly string Title;

    public readonly string ErrorCode;

    public int StatusCode { get; protected set; } = 500;

    public DomainException(string title, string errorCode,  string message)
        : base(message, null)
    {
        Title = title;
        ErrorCode = errorCode;
    }

    public DomainException(Exception exception, string errorCode = "Internal Error", string title = "Domain Unexpected error", int statusCode = 500)
        : base(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}{exception.Message}",
            exception.InnerException)
    {
        Title = title;
        StatusCode = statusCode;
        ErrorCode = errorCode;
    }
}
