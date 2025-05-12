using RpgAssistant.Infrastructure.Models.Characters;

namespace RpgAssistant.Infrastructure.Repositories.Interfaces;

public interface ICharacterRepository
{
    /// <summary>
    /// Asynchronously creates a new character in the database.
    /// </summary>
    /// <param name="createCharacter">
    /// The <see cref="CreateCharacter"/> object containing the character's properties to be created in the database.
    /// </param>
    /// <param name="cancellationToken">
    /// A cancellation token that can be used to observe when the asynchronous operation should be canceled.
    /// </param>
    /// <returns>
    /// A task that represents the asynchronous operation.
    /// </returns>
    public Task CreateAsync(CreateCharacter createCharacter, CancellationToken cancellationToken = default);
}
