using Microsoft.AspNetCore.Mvc;

namespace RpgAssistant.Api.IoC.Endpoints;

public static class UtilityEndpoints
{
    private const string PathToAppVersionSection = "endpointRouteBuilder";
    private const string PathToHealthEndpoint = "/health";
    private const string PathToApiVersionEndpoint = "/";

    static internal void AddHealthCheckEndpoint(
        this IEndpointRouteBuilder endpointRouteBuilder) =>
            endpointRouteBuilder
                .MapHealthChecks(PathToHealthEndpoint)
                .WithName("health")
                .WithOpenApi();

    static internal void AddVersionEndpoint(
        this RouteGroupBuilder endpointRouteBuilder) =>
            endpointRouteBuilder
                .MapGet(PathToApiVersionEndpoint,
                    ([FromServices] IConfiguration configuration) =>
                        configuration.GetSection(PathToAppVersionSection).Value)
                .WithName("version")
                .WithOpenApi()
                .Produces<string>();
}
