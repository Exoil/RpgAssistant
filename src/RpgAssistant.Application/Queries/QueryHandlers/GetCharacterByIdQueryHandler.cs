using MessagePipe;

using Neo4j.Driver;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

using ILogger = Serilog.ILogger;

namespace RpgAssistant.Application.Queries.QueryHandlers;

public class
    GetCharacterByIdQueryHandler : IAsyncRequestHandler<GetCharacterByIdQuery, Result<CharacterPayload, Exception>>
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;

    public GetCharacterByIdQueryHandler(
        ITransactionFactory<IAsyncTransaction> transactionFactory,
        ICharacterRepository characterRepository,
        ILogger logger)
    {
        _transactionFactory = transactionFactory;
        _characterRepository = characterRepository;
        _logger = logger;
    }

    public async ValueTask<Result<CharacterPayload, Exception>> InvokeAsync(
        GetCharacterByIdQuery request,
        CancellationToken cancellationToken = new())
    {
        await using var transaction = await _transactionFactory.CreateAsync();

        try
        {
            var idAsUlid = request.Id.GuidToUlid();

            var exists = await _characterRepository.ExistsAsync(transaction, idAsUlid);

            if (!exists.Exists)
            {
                _logger.Error("GetCharacterById fails for not existing character: {Id}", request.Id);
                return new NotFoundException(Entities.Character);
            }

            var character = await _characterRepository.GetAsync(transaction, idAsUlid);
            _logger.Information("Character found: {Id}", request.Id);

            return new CharacterPayload(character.Id.ToGuid(), character.Name, character.Version);
        }
        catch (Exception exception)
        {
            _logger.Error(exception, "Error getting character: {Id}", request.Id);
            return exception;
        }
    }
}
