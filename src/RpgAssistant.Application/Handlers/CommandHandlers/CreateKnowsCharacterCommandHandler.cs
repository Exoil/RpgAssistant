using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class CreateKnowsCharacterCommandhandler
    : IRequestHandler<CreateKnowsCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public CreateKnowsCharacterCommandhandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<Exception>> Handle(
        CreateKnowsCharacterCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            await _characterRepository.CreateKnowsRelaitonAsync(
                request.SourceId.ToUlidFormat(),
                request.TargetId.ToUlidFormat(),
                cancellationToken);
        }
        catch (Exception e)
        {
            return ExceptionUtility.ResolveExceptionToReturn(e);
        }

        return new Result<Exception>();
    }
}
