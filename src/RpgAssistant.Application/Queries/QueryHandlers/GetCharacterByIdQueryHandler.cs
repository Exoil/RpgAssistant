using MessagePipe;

using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Enums;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Application.Queries.QueryHandlers;

public class GetCharacterByIdQueryHandler : IAsyncRequestHandler<GetCharacterByIdQuery, Result<CharacterPayload, Exception>>
{
    private readonly TransactionFactory _transactionFactory;

    public GetCharacterByIdQueryHandler(TransactionFactory transactionFactory)
    {
        _transactionFactory = transactionFactory;
    }

    public async ValueTask<Result<CharacterPayload, Exception>> InvokeAsync(
        GetCharacterByIdQuery request,
        CancellationToken cancellationToken = new CancellationToken())
    {
        await using var transaction = await _transactionFactory.CreateAsync();
        var characterRepository = new CharacterRepository(transaction);

        try
        {
            var idAsUlid = request.Id.GuidToUlid();

            var exists = await characterRepository.ExistsAsync(idAsUlid);

            if (!exists.Exists)
            {
                return new NotFoundException(Entities.Character);
            }

            var character = await characterRepository.GetAsync(idAsUlid);

            return new CharacterPayload(character.Id.ToGuid(), character.Name, character.Version);
        }
        catch(Exception exception)
        {
            return exception;
        }
    }
}
