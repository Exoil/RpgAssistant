using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;
using RpgAssistant.Domain.Exceptions;
using FluentAssertions;
using Xunit;
using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Domain.Constants;
using Neo4j.Driver;
using RpgAssistant.Domain.Extensions;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryDeleteKnowsRelationAsyncTest 
    : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryDeleteKnowsRelationAsyncTest(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    public async Task Should_Delete_Knows_Relation_When_It_Exists()
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

        await characterRepository.CreateKnowsRelationAsync(sourceId, targetId, CancellationToken.None);

        // Act
        await characterRepository.DeleteKnowsRelationAsync(sourceId, targetId, CancellationToken.None);

        // Assert
        var query = "MATCH (source:Character {Id: $SourceId})-[:"+CharacterConstants.KnowsRelation+@"]->(target:Character {Id: $TargetId}) RETURN COUNT(*) AS count";
        var parameters = new { SourceId = sourceId.ToDatabaseId(), TargetId = targetId.ToDatabaseId() };
        var session = _container.Driver.AsyncSession();
        var result = await session.RunAsync(new Query(query, parameters));
        var count = await result.SingleAsync(record => record.GetRecordValue<int>("count"));
        count.Should().Be(0);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
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
        await FluentActions.Invoking(() => 
            characterRepository.DeleteKnowsRelationAsync(sourceId, nonExistentTargetId, CancellationToken.None))
            .Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
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
        await FluentActions.Invoking(() => 
            characterRepository.DeleteKnowsRelationAsync(nonExistentSourceId, targetId, CancellationToken.None))
            .Should().ThrowAsync<NotFoundException>();
    }

    [Fact]
    public async Task Should_Throw_Exception_When_Relation_Does_Not_Exist()
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

        // Act & Assert
        await FluentActions.Invoking(() => 
            characterRepository.DeleteKnowsRelationAsync(sourceId, targetId, CancellationToken.None))
            .Should().ThrowAsync<KnowsRelationCreationException>();
    }
} 