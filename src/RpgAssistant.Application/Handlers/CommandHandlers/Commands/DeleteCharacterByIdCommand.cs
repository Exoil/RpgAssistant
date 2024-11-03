using MediatR;
using RpgAssistant.Application.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record DeleteCharacterByIdCommand(Ulid Id) : IRequest<Result<Exception>>;