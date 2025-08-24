using System.Diagnostics.CodeAnalysis;

using RpgAssistant.Domain.Entities.Characters.Commands;

namespace RpgAssistant.Domain.Entities.Characters;

public class Character
{
    public Ulid Id { get; private init; }

    public string Name { get;  private set; }

    public int Version { get; private set; }

    public Character(CreateCharacter createCharacter)
    {
        Id = createCharacter.Id;
        Name = createCharacter.Name;
        Version = 1;
    }

    public Character(CreateCharacter createCharacter, int version) : this(createCharacter)
    {
        Version = version;
    }

}
