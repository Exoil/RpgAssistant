using System.Collections.Immutable;
using MediatR;
using RpgAssistant.Application.Models;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Application.Handlers.QueryHandlers.Queries;

public record GetCharactersQuery :
    Page,
    IRequest<Result<ImmutableArray<CharacterDetails>, Exception>>
{
    public GetCharactersQuery(uint number, uint size)
        : base(number, size)
    {
    }
}