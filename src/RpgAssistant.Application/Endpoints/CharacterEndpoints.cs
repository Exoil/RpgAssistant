using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Application.CQRS.Commands;
using RpgAssistant.Application.Dtos;
using RpgAssistant.Application.ResultResolvers;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Application.Endpoints;

public static class CharacterEndpoints
{
    public static void MapCharacterEndpoints(
        this WebApplication webApplication)
    {
        webApplication
            .MapGroup("characters")
            .MapCharacterEndpoints();
    }

    private static void MapCharacterEndpoints(this RouteGroupBuilder endpointGroup)
    {
        endpointGroup.MapPost(
            "/",
            async (
                    [FromServices] ResultsToHttpResponses responseResolver,
                    [FromBody] CharacterDto character,
                    CancellationToken cancellationToken = default) =>
                await responseResolver.GetResult<CreateCharacterCommand, Ulid>(
                    character.ToCommand(),
                    data =>  Results.Created(string.Empty, data.UlidToGuid()),
                    cancellationToken));
    }
}
