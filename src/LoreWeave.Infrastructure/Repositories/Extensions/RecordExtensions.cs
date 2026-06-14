using Neo4j.Driver;

using LoreWeave.Domain.Entities.Characters;
using LoreWeave.Domain.Entities.Characters.Commands;
using LoreWeave.Domain.Extensions;
using LoreWeave.Domain.Models;

namespace LoreWeave.Infrastructure.Repositories.Extensions;

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
                .As<List<string>>()
                .Select(x => x.DatabaseIdToUlid())
                .ToList()
                .AsReadOnly());

        return character;
    }
}
