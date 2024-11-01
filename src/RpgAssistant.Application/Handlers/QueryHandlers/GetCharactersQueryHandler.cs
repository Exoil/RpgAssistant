using System.Collections.Immutable;
using MediatR;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Application.Models;
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

    public Task<Result<ImmutableArray<CharacterDetails>, Exception>> Handle(GetCharactersQuery request, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}