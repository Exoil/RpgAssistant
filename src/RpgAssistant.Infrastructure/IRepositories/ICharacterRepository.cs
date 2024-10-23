using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.IRepositories;

public interface ICharacterRepository
{
    Task<Ulid> CreateAsync(CreateCharacter createCharacter, CancellationToken cancellationToken = default);
}