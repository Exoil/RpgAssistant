namespace LoreWeave.Api.Endpoints;

public static class UtilityEndpoints
{
    private const string _configurationPathToAppVersion = "AppVersion";

    public static IEndpointRouteBuilder MapUtilityEndpoints(
        this IEndpointRouteBuilder endpoints)
    {
        endpoints.MapGet("/version", (IConfiguration configuration)
            => Results.Ok((object?)configuration[_configurationPathToAppVersion]));

        return endpoints;
    }
}
