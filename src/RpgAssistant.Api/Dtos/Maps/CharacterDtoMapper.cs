using RpgAssistant.Application.Models;

namespace RpgAssistant.Api.Dtos.Maps;

public static class CharacterDtoMapper
{
    public static CharacterDto ToCharacterDto(this CharacterPayload characterPayload) =>
        new(characterPayload.Id, characterPayload.Name);
}
