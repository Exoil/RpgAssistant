using System.Collections.Immutable;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Infrastructure.Models;

namespace RpgAssistant.Infrastructure.IRepositories;

public interface ICharacterRepository
{
    Task<Ulid> CreateAsync(CreateCharacter createCharacter, CancellationToken cancellationToken = default);
    
    Task<Character> GetAsync(Ulid id, CancellationToken cancellationToken = default);
    Task<ImmutableArray<Character>> GetAsync(Page page, CancellationToken cancellationToken = default);
}