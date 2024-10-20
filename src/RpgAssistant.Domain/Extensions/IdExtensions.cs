namespace RpgAssistant.Domain.Extensions;

public static class IdExtensions
{
    public static Guid ToApiIdOutput(this Ulid id)
    {
        return id.ToGuid();
    }

    public static Ulid ToUlidFormat(this Guid id)
    {
        return Ulid.Parse(id.ToString());
    }
    
    public static string ToDatabaseId(this Ulid id)
    {
        return id.ToString().ToLowerInvariant();
    }
}