namespace RpgAssistant.Domain.Exceptions;

public record ValidationMessage(string PropertyName, string Message);