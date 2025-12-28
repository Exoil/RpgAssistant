using MessagePipe;
using Neo4j.Driver;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Queries;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

namespace RpgAssistant.Application.Queries.QueryHandlers;

public class GetCharacterPageQueryHandler
    : IAsyncRequestHandler<GetCharacterPageQuery, Result<IReadOnlyCollection<CharacterPayload>, Exception>>
{
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly ICharacterRepository _characterRepository;

    public GetCharacterPageQueryHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
    }

    public async ValueTask<Result<IReadOnlyCollection<CharacterPayload>, Exception>> InvokeAsync(
        GetCharacterPageQuery request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var character = await _characterRepository.GetAsync(transaction,
                new GetCharacterPage(
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
