using RpgAssistant.Domain.Entities.Characters.Commands;

namespace RpgAssistant.Application.CQRS.Queries;

public record GetCharacterByIdQuery(Guid Id);
