using MediatR;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.QueryHandlers;

public class GetCharacterByIdQueryHandler : IRequestHandler<GetCharacterByIdQuery, Result<CharacterDetails, Exception>>
{
    private ICharacterRepository _characterRepository;

    public GetCharacterByIdQueryHandler(
        ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<CharacterDetails, Exception>> Handle(GetCharacterByIdQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var character = await _characterRepository.GetAsync(request.Id, cancellationToken);

            return new CharacterDetails(character.Id.ToGuid(), character.Name, character.Description);
        }
        catch (Exception e)
        {
            return ExceptionUtility.ResolveExceptionToReturn(e);
        }

    }
}