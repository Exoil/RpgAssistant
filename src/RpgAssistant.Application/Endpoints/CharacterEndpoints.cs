using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Application.CQRS.Commands;
using RpgAssistant.Application.CQRS.Queries;
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
                    [FromBody] CreateCharacterDto createCharacter,
                    CancellationToken cancellationToken = default) =>
                await responseResolver.GetResult<CreateCharacterCommand, Ulid>(
                    createCharacter.ToCommand(),
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

        endpointGroup
            .MapGet(
                "/{id:guid}",
                async (
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromRoute] Guid id,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<GetCharacterByIdQuery, CharacterPayload>(
                        new GetCharacterByIdQuery(id),
                        data => Results.Ok(data),
                        cancellationToken));

        endpointGroup
            .MapGet(
                "",
                async (
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromQuery] uint pageNumber,
                        [FromQuery] uint pageSize,
                        [FromQuery] string sortType,
                        [FromQuery] string sortOrder,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<GetCharacterPageQuery, IReadOnlyCollection<CharacterPayload>>(
                        new GetCharacterPageQuery(pageNumber, pageSize, sortType, sortOrder),
                        data => Results.Ok(data),
                        cancellationToken));
    }
}
