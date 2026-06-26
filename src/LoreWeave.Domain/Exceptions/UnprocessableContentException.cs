namespace LoreWeave.Domain.Exceptions;

public class UnprocessableContentException : DomainException
{
    protected UnprocessableContentException(
        string title, string message, string errorCode)
        : base(title, errorCode, message) =>
        StatusCode = 422;

    public static UnprocessableContentException CreateKnowRelationFailsForNotExistingCharacter(Guid characterId) =>
        new(
            "Know relation create fail",
            $"Know relation fails for not existing character with id {characterId}",
            "UnableCreateKnowRelationForNotExistingCharacter");

    public static UnprocessableContentException CreateKnowRelationFailsWhenIdFormAndToAreSame(Guid characterId) =>
        new(
            "Know relation create fail",
            $"Know relation fails for same character id {characterId}",
            "UnableCreateKnowRelationForSameCharactersId");
}
