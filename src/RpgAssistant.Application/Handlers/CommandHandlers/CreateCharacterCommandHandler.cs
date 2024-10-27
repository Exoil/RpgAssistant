using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class CreateCharacterCommandHandler : IRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public CreateCharacterCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<Ulid, Exception>> Handle(CreateCharacterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _characterRepository.CreateAsync(request, cancellationToken);
        }
        catch (Exception e)
        {
            return ExceptionUtility.ResolveExceptionToReturn(e);
        }
        
    }
}