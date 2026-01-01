using Neo4j.Driver;

using RpgAssistant.Domain.Entities.Characters;
using RpgAssistant.Domain.Entities.Characters.Commands;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Repositories.Extensions;

public static class RecordExtensions
{
    public static Character ToCharacter(this IRecord record)
    {
        var createCharacter = new CreateCharacter(
            record["Id"].As<string>().DatabaseIdToUlid(),
            record["Name"].As<string>());

        return new Character(createCharacter, record["Version"].As<int>());
    }

    public static CharacterWithKnowRelation ToCharacterWithKnowRelation(this IRecord record)
    {
        var character = new CharacterWithKnowRelation(
            record["Id"].As<string>().DatabaseIdToUlid(),
            record["Name"].As<string>(),
            record["KnowRelationIds"]
                .As<List<string>>().
                Select(x => x.DatabaseIdToUlid())
                .ToList()
                .AsReadOnly());

        return character;
    }
}
