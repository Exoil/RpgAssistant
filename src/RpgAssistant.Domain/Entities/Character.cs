namespace RpgAssistant.Domain.Entities;

public class Character
{
    public required Ulid Id { get; set; }

    public required string Name { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public long Timestamp { get; set; }
}
