namespace RpgAssistant.Domain.Exceptions;

public class ConflictException() : DomainException("Entity was already changed,",
    "Conflict error",
    "Entity was already changed, please try again.");
