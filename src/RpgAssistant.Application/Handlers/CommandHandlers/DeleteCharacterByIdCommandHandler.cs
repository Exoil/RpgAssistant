using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class DeleteCharacterByIdCommandHandler : IRequestHandler<DeleteCharacterByIdCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public DeleteCharacterByIdCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<Exception>> Handle(DeleteCharacterByIdCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await _characterRepository.DeleteAsync(request.Id);
        }
        catch (Exception exception)
        {
            return ExceptionUtility.ResolveExceptionToReturn(exception);
        }

        return new Result<Exception>();
    }
}