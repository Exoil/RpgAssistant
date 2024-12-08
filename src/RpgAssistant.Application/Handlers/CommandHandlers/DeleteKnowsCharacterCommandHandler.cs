using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class DeleteKnowsCharacterCommandHandler
    : IRequestHandler<DeleteKnowsCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public DeleteKnowsCharacterCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<Exception>> Handle(DeleteKnowsCharacterCommand request, CancellationToken cancellationToken)
    {

        try
        {
            await _characterRepository.DeleteKnowsRelationAsync(
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
