namespace LoreWeave.Domain.Extensions;

public static class GuidExtensions
{
    public static string ToDatabaseId(this Guid id) => id.ToString().ToLowerInvariant();

    public static Guid DatabaseIdToGuid(this string id) => Guid.Parse(id);
}
