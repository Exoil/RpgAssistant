using MessagePipe;

using RpgAssistant.Application.Dtos;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Models;
using RpgAssistant.Infrastructure.Factories;
using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Application.CQRS.Queries.QueryHandlers;

public class GetCharacterPageQueryHandler
    : IAsyncRequestHandler<GetCharacterPageQuery, Result<IReadOnlyCollection<CharacterPayload>, Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public GetCharacterPageQueryHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<IReadOnlyCollection<CharacterPayload>, Exception>> InvokeAsync(
        GetCharacterPageQuery request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var character = await characterRepository.GetAsync(new GetCharacterPage(
                request.Number,
                request.Size,
                request.SortType,
                request.SortOrder));

            return character
                .Select(x => new CharacterPayload(x.Id.ToGuid(), x.Name, x.Version))
                .ToList()
                .AsReadOnly() ;
        }
        catch(Exception exception)
        {
            return exception;
        }
    }
}
