using LoreWeave.Domain.Entities.Characters.Commands;

namespace LoreWeave.Domain.Entities.Characters;

public sealed class Character
{
    public Character(CreateCharacter createCharacter)
    {
        Id = createCharacter.Id;
        Name = createCharacter.Name;
        Version = 1;
    }

    public Character(CreateCharacter createCharacter, int version) : this(createCharacter) => Version = version;

    public Ulid Id { get; private init; }

    public string Name { get; private set; }

    public int Version { get; private set; }
}
