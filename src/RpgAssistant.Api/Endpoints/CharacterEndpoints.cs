using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

using RpgAssistant.Api.Constants;
using RpgAssistant.Api.CQRS.Commands;
using RpgAssistant.Api.CQRS.Queries;
using RpgAssistant.Api.Dtos;
using RpgAssistant.Api.ResultResolvers;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Api.Endpoints;

public static class CharacterEndpoints
{
    public static void MapCharacterEndpoints(
        this WebApplication webApplication)
    {
        webApplication
            .MapGroup("v1/characters")
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
                        [FromHeader(Name = HeadersConstants.IfMatch)] string version,
                        [FromBody] UpdateCharacterDto updateCharacter,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<UpdateCharacterCommand>(
                        updateCharacter.ToCommand(id, version),
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
                        [FromServices] IHttpContextAccessor httpContextAccessor,
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromRoute] Guid id,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<GetCharacterByIdQuery, CharacterPayload>(
                        new GetCharacterByIdQuery(id),
                        data =>
                        {
                            httpContextAccessor.HttpContext!.Response.Headers.ETag = new StringValues(data.Etag);

                            return Results.Ok(data.ToDto());
                        },
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
                        data => Results.Ok(
                            data.Select(x => x.ToDto())),
                        cancellationToken));

        endpointGroup
            .MapPost(
                "/knows",
                async (
                    [FromServices] ResultsToHttpResponses responseResolver,
                    [FromBody] CreateKnowsDto createKnowsDto,
                    CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<CreateKnowRelationCommand, Ulid>(
                        createKnowsDto.ToCommand(),
                        data => Results.Created(
                            new Uri($"/knows/{data.UlidToGuid()}", UriKind.Relative), data.UlidToGuid()),
                        cancellationToken)
                );

        endpointGroup
            .MapDelete(
                "/knows/{from:guid}/to/{to:guid}",
                async (
                        [FromServices] ResultsToHttpResponses responseResolver,
                        [FromRoute] Guid from,
                        [FromRoute] Guid to,
                        CancellationToken cancellationToken = default) =>
                    await responseResolver.GetResult<DeleteKnowRelationCommand>(
                        new DeleteKnowRelationCommand(from.GuidToUlid(), to.GuidToUlid()),
                        Results.NoContent,
                        cancellationToken)
            );
    }
}
