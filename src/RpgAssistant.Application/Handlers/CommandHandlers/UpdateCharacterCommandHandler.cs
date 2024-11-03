using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class UpdateCharacterCommandHandler : IRequestHandler<UpdateCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public UpdateCharacterCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<Exception>> Handle(UpdateCharacterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _characterRepository.UpdateAsync(request, cancellationToken);

            return new Result<Exception>();
        }
        catch (Exception e)
        {
            return ExceptionUtility.ResolveExceptionToReturn(e);
        }
    }
}