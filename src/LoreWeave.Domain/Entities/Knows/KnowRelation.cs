namespace LoreWeave.Domain.Entities.Knows;

public sealed class KnowRelation
{
    public KnowRelation(
        Ulid id,
        string description,
        bool isStrongRelation,
        Ulid fromCharacterId,
        Ulid toCharacterId,
        int version)
    {
        Id = id;
        Description = description;
        IsStrongRelation = isStrongRelation;
        FromCharacterId = fromCharacterId;
        ToCharacterId = toCharacterId;
        Version = version;
    }

    public Ulid Id { get; private init; }

    public string Description { get; private set; }

    public Ulid FromCharacterId { get; private set; }

    public Ulid ToCharacterId { get; private set; }
    
    public bool IsStrongRelation { get; private set; }

    public int Version { get; private set; }
}
