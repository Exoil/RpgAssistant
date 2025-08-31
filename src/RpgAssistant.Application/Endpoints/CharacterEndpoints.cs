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
        endpointGroup
            .MapPost(
            "/",
            async (
                    [FromServices] ResultsToHttpResponses responseResolver,
                    [FromBody] CharacterDto character,
                    CancellationToken cancellationToken = default) =>
                await responseResolver.GetResult<CreateCharacterCommand, Ulid>(
                    character.ToCommand(),
                    data =>  Results.Created(string.Empty, data.UlidToGuid()),
                    cancellationToken));

        endpointGroup
            .MapPut(
                "/{id:guid}",
                async (
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromRoute] Guid id,
                        [FromBody] UpdateCharacterDto updateCharacter,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<UpdateCharacterCommand>(
                        updateCharacter.ToCommand(id),
                        Results.NoContent,
                        cancellationToken));

        endpointGroup
            .MapDelete(
                "/{id:guid}",
                async (
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromRoute] Guid id,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<DeleteCharacterCommand>(
                        new DeleteCharacterCommand(id),
                        Results.NoContent,
                        cancellationToken));
    }
}
