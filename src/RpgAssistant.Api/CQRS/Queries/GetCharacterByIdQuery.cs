using RpgAssistant.Domain.Entities.Characters.Commands;

namespace RpgAssistant.Api.CQRS.Queries;

public record GetCharacterByIdQuery(Guid Id);
