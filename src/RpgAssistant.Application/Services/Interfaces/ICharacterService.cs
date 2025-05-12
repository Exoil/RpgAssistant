using RpgAssistant.Application.Models;
using RpgAssistant.Application.Models.Characters;

namespace RpgAssistant.Application.Services.Interfaces;

/// <summary>
/// Provides operations for managing characters in the application.
/// </summary>
public interface ICharacterService
{
    /// <summary>
    /// Creates a new character asynchronously.
    /// </summary>
    /// <param name="createCharacter">
    /// The data for creating a new character, including its name and other necessary information.
    /// </param>
    /// <param name="cancellationToken">
    /// A token that can be used to observe the cancellation of the asynchronous operation.
    /// </param>
    /// <returns>
    /// A task representing the asynchronous operation. The result contains a unique identifier (Ulid)
    /// of the newly created character if successful, or an exception in case of an error.
    /// </returns>
    public Task<Result<Ulid, Exception>> CreateAsync(
        CreateCharacter createCharacter,
        CancellationToken cancellationToken = default);
}
