using MediatR;
using RpgAssistant.Application.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers.Commands;

public record CreateKnowsCharacterCommand(
    Guid SourceId,
    Guid TargetId) : IRequest<Result<Exception>>;