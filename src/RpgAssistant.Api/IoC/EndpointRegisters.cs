using Microsoft.AspNetCore.Mvc;

namespace RpgAssistant.Api.IoC;

public static class EndpointRegisters
{
    public static void RegisterUtilitiesEndpoints(
        this WebApplication webApplication)
    {
        webApplication
            .MapGet("/",  ([FromServices]IConfiguration configuration) =>
                configuration.GetSection("AppVersion").Value)
            .Produces<string>();
    }
}