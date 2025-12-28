using MessagePipe;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Queries;

namespace RpgAssistant.Application.Queries.QueryHandlers;

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
