using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using LoreWeave.Application.Models;
using LoreWeave.Application.Queries;
using LoreWeave.Application.Queries.QueryHandlers;
using LoreWeave.Domain.Entities.Characters.Queries;
using LoreWeave.Domain.Extensions;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Models;
using LoreWeave.Domain.Repositories;

using Serilog;

using Shouldly;

namespace LoreWeave.Application.Test.Queries.QueryHandlers;

public class GetCharacterPageQueryHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly ILogger _logger;
    private readonly IAsyncTransaction _transaction;
    private readonly ITransactionFactory<IAsyncTransaction> _transactionFactory;
    private readonly GetCharacterPageQueryHandler _sut;

    public GetCharacterPageQueryHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        _logger = Substitute.For<ILogger>();
        _transaction = Substitute.For<IAsyncTransaction>();
        _transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        _transactionFactory.CreateAsync().Returns(_transaction);

        _sut = new GetCharacterPageQueryHandler(_transactionFactory, _characterRepository, _logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharactersExist_ReturnsPageWithRelations()
    {
        // Arrange
        var query = new GetCharacterPageQuery(1, 10, "Name", "Asc", null);
        var knownCharacterId = Ulid.NewUlid();
        var characters = new List<CharacterWithKnowRelation>
        {
            new(Ulid.NewUlid(), "CharacterA",
                new List<KnowRelationDetail>
                {
                    new(knownCharacterId, "Childhood friends", true)
                }.AsReadOnly()),
            new(Ulid.NewUlid(), "CharacterB", new List<KnowRelationDetail>().AsReadOnly())
        }.AsReadOnly();

        _characterRepository
            .GetAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<GetCharacterPage>(), Arg.Any<CharacterSearchFilter>())
            .Returns(characters);

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeTrue("Query should succeed when characters are found");
        result.Value.ShouldBeAssignableTo<IReadOnlyCollection<CharacterPayloadWithRelations>>("Result should be a read-only collection");
        result.Value.Count.ShouldBe(2, "Result should contain 2 characters");
        result.Value.First().Name.ShouldBe("CharacterA", "First character name should match");
        result.Value.First().KnowCharacters.Count.ShouldBe(1, "First character should have 1 relation");

        var relation = result.Value.First().KnowCharacters.First();
        relation.CharacterId.ShouldBe(knownCharacterId.ToGuid(), "Relation should point to the known character");
        relation.Description.ShouldBe("Childhood friends", "Relation description should match");
        relation.IsStrongRelation.ShouldBeTrue("Relation should be marked as strong");

        result.Value.Last().KnowCharacters.ShouldBeEmpty("Second character should have no relations");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenNoCharactersExist_ReturnsEmptyCollection()
    {
        // Arrange
        var query = new GetCharacterPageQuery(1, 10, "Name", "Asc", null);
        _characterRepository
            .GetAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<GetCharacterPage>(), Arg.Any<CharacterSearchFilter>())
            .Returns(new List<CharacterWithKnowRelation>().AsReadOnly());

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeTrue("Query should succeed even when no characters are found");
        result.Value.ShouldBeEmpty("Result should be empty when no characters exist");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsException()
    {
        // Arrange
        var query = new GetCharacterPageQuery(1, 10, "Name", "Asc", null);
        var expectedException = new Exception("DB error");
        _characterRepository
            .GetAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<GetCharacterPage>(), Arg.Any<CharacterSearchFilter>())
            .ThrowsAsync(expectedException);

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeFalse("Result should be failure when repository throws");
        result.Error.ShouldBe(expectedException, "Error should be the thrown exception");
    }
}
