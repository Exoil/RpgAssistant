using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Api.Models.Characters;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Services;
using RpgAssistant.Application.Services.Interfaces;

namespace RpgAssistant.Api.IoC.Endpoints;

static internal class CharacterEndpoints
{
    private const string PathToCharacters = "/characters";

    public static void AddCharacterEndpoints(
        this IEndpointRouteBuilder endpointRouteBuilder)
    {
        var characterGroup = endpointRouteBuilder.MapGroup(PathToCharacters);

        characterGroup.MapPost(
            "/",
            async (
                [FromServices] ResultResolver resultResolver,
                [FromServices] ICharacterService characterService,
                [FromBody] CreateCharacterDto character,
                CancellationToken cancellation = default) =>
            {
                var serviceResult = await characterService
                    .CreateAsync(character.ToCreateCharacter(), cancellation);
                var response = resultResolver.GetResult(
                    serviceResult,
                    data => Results.Ok(data.ToGuid()));

                return response;
            });
    }
}
