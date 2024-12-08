using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Domain.Extensions;
using Neo4j.Driver;
using FluentAssertions;


namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryCreateKnowsRelationAsyncTest 
    : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryCreateKnowsRelationAsyncTest(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    public async Task Should_Create_Knows_Relation_When_Both_Characters_Exist()
    {
        // Arrange
        await using var characterRepository = new CharacterRepository(_container.Driver);
        var sourceCharacter = new CreateCharacter(
            new string('S', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );
        var targetCharacter = new CreateCharacter(
            new string('T', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );

        var sourceId = await characterRepository.CreateAsync(sourceCharacter, CancellationToken.None);
        var targetId = await characterRepository.CreateAsync(targetCharacter, CancellationToken.None);

        // Act
        await characterRepository.CreateKnowsRelaitonAsync(sourceId, targetId, CancellationToken.None);

        // Assert
        var query = "MATCH (source:Character {Id: $SourceId})-[:KNOWS]->(target:Character {Id: $TargetId}) RETURN COUNT(*) AS count";
        var parameters = new { SourceId = sourceId.ToDatabaseId(), TargetId = targetId.ToDatabaseId() };
        var session = _container.Driver.AsyncSession();
        var result = await session.RunAsync(new Query(query, parameters));
        var count = await result.SingleAsync(record => record.GetRecordValue<int>("count"));
        count.Should().Be(1);
    }

    [Fact]
    public async Task Should_Throw_Exception_When_Target_Character_Does_Not_Exist()
    {
        // Arrange
        await using var characterRepository = new CharacterRepository(_container.Driver);
        var sourceCharacter = new CreateCharacter(
            new string('S', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );
        var sourceId = await characterRepository.CreateAsync(sourceCharacter, CancellationToken.None);
        var nonExistentTargetId = Ulid.NewUlid();

        // Act & Assert
        await Assert.ThrowsAsync<KnowsRelationCreationException>(() =>
            characterRepository.CreateKnowsRelaitonAsync(sourceId, nonExistentTargetId, CancellationToken.None));
    }

    [Fact]
    public async Task Should_Throw_Exception_When_Source_Character_Does_Not_Exist()
    {
        // Arrange
        await using var characterRepository = new CharacterRepository(_container.Driver);
        var targetCharacter = new CreateCharacter(
            new string('T', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );
        var targetId = await characterRepository.CreateAsync(targetCharacter, CancellationToken.None);
        var nonExistentSourceId = Ulid.NewUlid();

        // Act & Assert
        await Assert.ThrowsAsync<KnowsRelationCreationException>(() =>
            characterRepository.CreateKnowsRelaitonAsync(nonExistentSourceId, targetId, CancellationToken.None));
    }

    [Fact]
    public async Task Should_Throw_Exception_When_Relation_Already_Exists()
    {
        // Arrange
        await using var characterRepository = new CharacterRepository(_container.Driver);
        var sourceCharacter = new CreateCharacter(
            new string('S', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );
        var targetCharacter = new CreateCharacter(
            new string('T', CharacterConstants.MinNameLength),
            new string('D', CharacterConstants.MinNameLength)
        );

        var sourceId = await characterRepository.CreateAsync(sourceCharacter, CancellationToken.None);
        var targetId = await characterRepository.CreateAsync(targetCharacter, CancellationToken.None);

        await characterRepository.CreateKnowsRelaitonAsync(sourceId, targetId, CancellationToken.None);

        // Act & Assert
        await Assert.ThrowsAsync<KnowsRelationCreationException>(() =>
            characterRepository.CreateKnowsRelaitonAsync(sourceId, targetId, CancellationToken.None));
    }
} 