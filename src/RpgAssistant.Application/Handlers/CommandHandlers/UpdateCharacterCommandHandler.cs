using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class UpdateCharacterCommandHandler : IRequestHandler<UpdateCharacterCommand, Result<Exception>>
{
    public Task<Result<Exception>> Handle(UpdateCharacterCommand request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}