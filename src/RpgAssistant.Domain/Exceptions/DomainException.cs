namespace RpgAssistant.Domain.Exceptions;

public class DomainException : Exception
{
    public readonly string Title;
    public int StatusCode { get; private set; } = 500;
    public DomainException(string title, string message)
        : base(message, null)
    {
        Title = title;
    }
    
    public DomainException(string title, string message, int statusCode)
        : base(message, null)
    {
        Title = title;
        StatusCode = statusCode;
    }
}