using MediatR;
using RpgAssistant.Application.Models;

namespace RpgAssistant.Application.Handlers.QueryHandlers.Queries;

public record GetCharacterByIdQuery(Ulid Id) : IRequest<Result<CharacterDetails, Exception>>;