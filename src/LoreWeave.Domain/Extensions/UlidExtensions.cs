namespace LoreWeave.Domain.Extensions;

public static class UlidExtensions
{
    public static string ToDatabaseId(this Ulid id) => id.ToString().ToLowerInvariant();

    public static Ulid DatabaseIdToUlid(this string id) => Ulid.Parse(id);

    public static Ulid GuidToUlid(this Guid id) => new(id);

    public static Guid UlidToGuid(this Ulid id) => id.ToGuid();
}
