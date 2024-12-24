using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Api.Dtos;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Api.IoC;

public static class EndpointRegisters
{
    public static void RegisterUtilitiesEndpoints(
        this WebApplication webApplication)
    {
        webApplication
            .MapGet("api/version",  ([FromServices]IConfiguration configuration) =>
                configuration.GetSection("AppVersion").Value)
            .Produces<string>();
    }

    public static void RegisterCharacterEndpoints(
        this WebApplication webApplication)
    {
        var endpointGroup = webApplication.MapGroup("api/characters");
        endpointGroup.MapPost(
            "/", 
            async (
            [FromServices] IResponseResolver responseResolver,
            [FromBody] Character character,
            CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new CreateCharacterCommand(character.Name, character.Description),
                data =>  Results.Created(string.Empty,data.ToGuid()),
                cancellationToken));

        endpointGroup.MapGet("/{id}",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromRoute] Guid id,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new GetCharacterByIdQuery(id.ToUlidFormat()),
                data =>  Results.Ok(new CharacterDetails(data)),
                cancellationToken));
        
        endpointGroup.MapGet("",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromQuery] uint number = 0,
                [FromQuery] uint size = 10,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new GetCharactersQuery(number, size),
                data =>
                    Results.Ok(data.Select(x => new CharacterDetails(x))),
                cancellationToken));

        endpointGroup.MapPut("/{id}",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromRoute] Guid id,
                [FromBody] Character characterDataToUpdate,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new UpdateCharacterCommand(id.ToUlidFormat(), characterDataToUpdate.Name, characterDataToUpdate.Description),
                () => Results.NoContent(),
                cancellationToken));
        
        endpointGroup.MapDelete("/{id}",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromRoute] Guid id,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new DeleteCharacterByIdCommand(id.ToUlidFormat()),
                () =>  Results.NoContent(),
                cancellationToken));

        endpointGroup.MapPut("/{soureId}/knows/{targetId}",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromRoute] Guid sourceId,
                [FromRoute] Guid targetId,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new CreateKnowsCharacterCommand(sourceId, targetId),
                () => Results.NoContent(),
                cancellationToken));

        endpointGroup.MapDelete("/{soureId}/knows/{targetId}",  async (
                [FromServices] IResponseResolver responseResolver,
                [FromRoute] Guid sourceId,
                [FromRoute] Guid targetId,
                CancellationToken cancellationToken = default) =>
            await responseResolver.GetResult(
                new DeleteKnowsCharacterCommand(sourceId, targetId),
                () => Results.NoContent(),
                cancellationToken));
    }
}