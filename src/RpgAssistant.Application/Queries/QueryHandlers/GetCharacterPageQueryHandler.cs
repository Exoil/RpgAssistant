using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Entities.Characters.Queries;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Models;
using RpgAssistant.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace RpgAssistant.Application.Queries.QueryHandlers;

public class GetCharacterPageQueryHandler
    : IAsyncRequestHandler<GetCharacterPageQuery, Result<IReadOnlyCollection<CharacterPayloadWithRelations>, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public GetCharacterPageQueryHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<IReadOnlyCollection<CharacterPayloadWithRelations>, Exception>> InvokeAsync(
        GetCharacterPageQuery request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var character = await _characterRepository.GetAsync(
                transaction,
                new GetCharacterPage(
                    request.Number,
                    request.Size,
                    request.SortType,
                    request.SortOrder),
                new CharacterSearchFilter(
                    request.CharacterName));

            _logger.Information(
                "Character page found: {Number} - {Size}",
                request.Number,
                request.Size);

            return character
                .Select(x => new CharacterPayloadWithRelations(
                    x.Id.ToGuid(),
                    x.Name,
                    x.KnowCharacterIds
                        .Select(y => y.ToGuid())
                        .ToList()
                        .AsReadOnly()))
                .ToList()
                .AsReadOnly();
        }
        catch (Exception exception)
        {
            _logger.Error(
                exception,
                "Error getting character page: {Number} - {Size}",
                request.Number,
                request.Size);
            return exception;
        }
    }
}
