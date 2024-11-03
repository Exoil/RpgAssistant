using RpgAssistant.Domain.Entities;
using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Domain.ErrorMessages;

public static class CharacterErrorMessages
{
    public static NotFoundException GetNotFoundCharacterMessage(string source)
        => new(nameof(Character), "NotFoundCharacterById", source);
}