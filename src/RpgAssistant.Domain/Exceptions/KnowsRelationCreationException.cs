using System;

namespace RpgAssistant.Domain.Exceptions;

public class KnowsRelationCreationException : DomainException
{
    public KnowsRelationCreationException(string title, string errorCode, string message)
        : base(title, errorCode, message)
    {
    }

    public KnowsRelationCreationException(string title, string errorCode, string message, int statusCode)
        : base(title, errorCode, message, statusCode)
    {
    }
}
