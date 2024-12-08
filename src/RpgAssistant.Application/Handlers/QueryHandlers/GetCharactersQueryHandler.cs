using System.Collections.Immutable;
using MediatR;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Utilities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.QueryHandlers;

public class GetCharactersQueryHandler 
    : IRequestHandler<GetCharactersQuery, Result<ImmutableArray<CharacterDetails>, Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public GetCharactersQueryHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public async Task<Result<ImmutableArray<CharacterDetails>, Exception>> Handle(GetCharactersQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var characters = await _characterRepository.GetAsync(request, cancellationToken);

            return characters.Select(x => new CharacterDetails(
                    x.Id.ToGuid(),
                    x.Name,
                    x.Description))
                .ToImmutableArray();
        }
        catch(Exception e)
        {
            return ExceptionUtility.ResolveExceptionToReturn(e);
        }
        
    }
}