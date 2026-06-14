namespace Loreweave.Domain.Exceptions;

public class PreconditionException() : DomainException("Entity was already changed,",
    "Conflict error",
    "Entity was already changed, please try again.");
