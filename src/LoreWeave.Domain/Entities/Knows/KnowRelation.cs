namespace LoreWeave.Domain.Entities.Knows;

public sealed class KnowRelation
{
    public KnowRelation(
        Ulid id,
        string description,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        int version)
    {
        Id = id;
        Description = description;
        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;
        Version = version;
    }

    public Ulid Id { get; private init; }

    public string Description { get; private set; }

    public Ulid FromCharacterId { get; private set; }

    public Ulid ToCharacterId { get; private set; }

    public int Version { get; private set; }
}
