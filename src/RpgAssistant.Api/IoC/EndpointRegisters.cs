using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Api.Dtos;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;

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

    public static void RegisterCharacterEndpoints(
        this WebApplication webApplication)
    {
        var endpointGroup = webApplication.MapGroup("/characters");

        endpointGroup.MapPost("/", async (
            [FromServices] IResponseResolver responseResolver,
            [FromBody] Character character,
            CancellationToken cancellationToken = default) =>
        {

            return await responseResolver.GetResult(
                new CreateCharacterCommand(character.Name, character.Description),
                data =>  Results.Ok(data.));
        });
    }
}