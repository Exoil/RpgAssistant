using RpgAssistant.Application.Extensions;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Models.Characters;
using RpgAssistant.Application.Services.Interfaces;
using RpgAssistant.Infrastructure.Repositories.Interfaces;

using Serilog;

namespace RpgAssistant.Application.Services;

/// <summary>
/// Provides services for handling character-related operations in the application.
/// </summary>
internal class CharacterService : ICharacterService
{
    private readonly ICharacterRepository _characterRepository;

    private readonly TimeProvider _timeProvider;

    private readonly ILogger _logger;

    /// <summary>
    /// Service for managing character-related operations in the application.
    /// </summary>
    public CharacterService(
        ICharacterRepository characterRepository,
        TimeProvider timeProvider, ILogger logger)
    {
        _characterRepository = characterRepository;
        _timeProvider = timeProvider;
        _logger = logger;
    }

    /// <summary>
    /// Asynchronously creates a new character with the specified details and saves it to the repository.
    /// </summary>
    /// <param name="createCharacter">The details of the character to create.</param>
    /// <param name="cancellationToken">A token to cancel the operation, if needed.</param>
    /// <returns>
    /// A result containing the unique identifier of the newly created character if successful;
    /// otherwise, an exception if an error occurs during the creation process.
    /// </returns>
    public async Task<Result<Ulid, Exception>> CreateAsync(
        CreateCharacter createCharacter,
        CancellationToken cancellationToken = default)
    {
        var id = Ulid.NewUlid();
        var createdAtDateTimeOffset = _timeProvider.GetUtcNow();
        var timestamp = createdAtDateTimeOffset.ToUnixTimeMilliseconds();
        var createCharacterDbModel = new Infrastructure.Models.Characters.CreateCharacter(
            id.UlidToLowerString(),
            createCharacter.Name,
            createdAtDateTimeOffset,
            timestamp);

        _logger.Information("Creating character with name: {Name}", createCharacter.Name);
        try
        {
            await _characterRepository
                .CreateAsync(createCharacterDbModel, cancellationToken);
        }
        catch (Exception ex)
        {
            return ex;
        }
        _logger.Information("Character created with id: {Id}", id);;

        return id;
    }
}
