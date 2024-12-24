using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Api.Dtos;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Domain.Extensions;


namespace RpgAssistant.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CharactersController : ControllerBase
{
    private readonly IResponseResolver _responseResolver;

    public CharactersController(IResponseResolver responseResolver)
    {
        _responseResolver = responseResolver;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCharacter([FromBody] Character character, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new CreateCharacterCommand(character.Name, character.Description),
            data => Results.Created(string.Empty, data.ToGuid()),
            cancellationToken);

        return result;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCharacterById([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new GetCharacterByIdQuery(id.ToUlidFormat()),
            data => Results.Ok(new CharacterDetails(data)),
            cancellationToken);

        return result;
    }

    [HttpGet]
    public async Task<IActionResult> GetCharacters([FromQuery] uint number = 0, [FromQuery] uint size = 10, CancellationToken cancellationToken = default)
    {
        var result = await _responseResolver.GetResult(
            new GetCharactersQuery(number, size),
            data => Results.Ok(data.Select(x => new CharacterDetails(x))),
            cancellationToken);

        return result;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCharacter([FromRoute] Guid id, [FromBody] Character characterDataToUpdate, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new UpdateCharacterCommand(id.ToUlidFormat(), characterDataToUpdate.Name, characterDataToUpdate.Description),
            () => Results.NoContent(),
            cancellationToken);

        return result;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCharacter([FromRoute] Guid id, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new DeleteCharacterByIdCommand(id.ToUlidFormat()),
            () => Results.NoContent(),
            cancellationToken);

        return result;
    }

    [HttpPut("{sourceId}/knows/{targetId}")]
    public async Task<IActionResult> CreateKnowsCharacter([FromRoute] Guid sourceId, [FromRoute] Guid targetId, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new CreateKnowsCharacterCommand(sourceId, targetId),
            () => Results.NoContent(),
            cancellationToken);

        return result;
    }

    [HttpDelete("{sourceId}/knows/{targetId}")]
    public async Task<IActionResult> DeleteKnowsCharacter([FromRoute] Guid sourceId, [FromRoute] Guid targetId, CancellationToken cancellationToken)
    {
        var result = await _responseResolver.GetResult(
            new DeleteKnowsCharacterCommand(sourceId, targetId),
            () => Results.NoContent(),
            cancellationToken);

        return result;
    }
}
