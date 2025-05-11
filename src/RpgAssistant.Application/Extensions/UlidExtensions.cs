namespace RpgAssistant.Application.Extensions;

public static class UlidExtensions
{
    public static string UlidToLowerString(this Ulid ulid) => ulid.ToString().ToLowerInvariant();
}
