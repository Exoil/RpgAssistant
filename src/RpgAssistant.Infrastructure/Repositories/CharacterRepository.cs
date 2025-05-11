using Neo4j.Driver;

using RpgAssistant.Infrastructure.Models.Characters;
using RpgAssistant.Infrastructure.Repositories.Interfaces;
using RpgAssistant.Infrastructure.Repositories.Utilities;

namespace RpgAssistant.Infrastructure.Repositories;

/// <summary>
/// Repository class for managing Character entities in the database.
/// </summary>
/// <remarks>
/// This class provides methods to interact with the database for operations related
/// to Character data. It inherits from the BaseGraphRepository to leverage database
/// connectivity and transaction handling capabilities.
/// </remarks>
internal class CharacterRepository : BaseGraphRepository, ICharacterRepository
{
    private readonly TimeProvider _timeProvider;

    /// <summary>
    /// Repository class for handling operations related to Character entities in the database.
    /// </summary>
    /// <remarks>
    /// This repository interacts with the Graph Database using Neo4j.Driver.
    /// It provides functionality for creating Characters and is designed to manage
    /// the lifecycle and integrity of database transactions.
    /// </remarks>
    public CharacterRepository(
        IDriver driver,
        TimeProvider timeProvider)
        : base(driver) =>
        _timeProvider = timeProvider;

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
    public async Task CreateAsync(CreateCharacter createCharacter, CancellationToken cancellationToken = default)
    {
        var queryString =
            @"CREATE (c:Character {
                Id: $Id,
                Name: $Name,
                CreateDateTimeOffset: $CreateDateTimeOffset,
                Timestamp: $Timestamp })
             RETURN c.Id";

        var query = new Query(
            queryString,
            new
            {
                createCharacter.Id,
                createCharacter.Name,
                createCharacter.CreateDateTimeOffset,
                createCharacter.Timestamp
            });

        await using var transaction =  await _session.BeginTransactionAsync();

        try
        {
            await transaction.RunAsync(query);
            await transaction.CommitAsync();
        }
        catch (Exception ex) when (ex.GetType().Namespace?.StartsWith("Neo4j.Driver") == true)
        {
            await transaction.RollbackAsync();
            throw Neo4jExceptionMapper.MapToDomainException(ex);
        }
    }
}
