using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using LoreWeave.Application.Commands;
using LoreWeave.Application.Commands.CommandHandlers;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Models;
using LoreWeave.Domain.Repositories;

using Serilog;

using Shouldly;

namespace LoreWeave.Application.Test.Commands.CommandHandlers;

public class CreateKnowRelationCommandHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly IAsyncTransaction _transaction;
    private readonly CreateKnowRelationCommandHandler _sut;

    private static readonly Ulid _fromCharacterId = Ulid.NewUlid();
    private static readonly Ulid _toCharacterId = Ulid.NewUlid();

    public CreateKnowRelationCommandHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        var logger = Substitute.For<ILogger>();
        _transaction = Substitute.For<IAsyncTransaction>();
        var transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        transactionFactory.CreateAsync().Returns(_transaction);

        _sut = new CreateKnowRelationCommandHandler(transactionFactory, _characterRepository, logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenBothCharactersExist_ReturnsUlid()
    {
        // Arrange
        const string description = "They know each other";
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, description, true);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns(new EntityExistence(true, 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Know relation creation should succeed when both characters exist");
        result.Value.ShouldNotBe(default(Ulid), "Returned ULID should not be empty");
        await _transaction.Received(1).CommitAsync();
        await _characterRepository
            .Received(1)
            .CreateKnowRelationAsync(
                Arg.Any<IAsyncTransaction>(),
                Arg.Is<LoreWeave.Domain.Entities.Knows.Commands.CreateKnowRelation>(r =>
                    r.IsStrongRelation
                    && r.Description == description
                    && r.FromCharacterId == _fromCharacterId
                    && r.ToCharacterId == _toCharacterId));
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenBothCharactersExist_PassesDescriptionToRepository()
    {
        // Arrange
        const string description = "A long-standing friendship";
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, description, true);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns(new EntityExistence(true, 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Know relation creation should succeed when both characters exist");
        await _characterRepository
            .Received(1)
            .CreateKnowRelationAsync(
                Arg.Any<IAsyncTransaction>(),
                Arg.Is<LoreWeave.Domain.Entities.Knows.Commands.CreateKnowRelation>(r => r.Description == description));
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRelationIsNotStrong_PassesIsStrongRelationFalseToRepository()
    {
        // Arrange
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other", false);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns(new EntityExistence(true, 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Know relation creation should succeed when both characters exist");
        await _characterRepository
            .Received(1)
            .CreateKnowRelationAsync(
                Arg.Any<IAsyncTransaction>(),
                Arg.Is<LoreWeave.Domain.Entities.Knows.Commands.CreateKnowRelation>(r => !r.IsStrongRelation));
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenFromCharacterDoesNotExist_ReturnsUnprocessableContentException()
    {
        // Arrange
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other", true);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(false, 0));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Know relation creation should fail when from character does not exist");
        result.Error.ShouldBeOfType<UnprocessableContentException>("Error should be UnprocessableContentException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenToCharacterDoesNotExist_ReturnsUnprocessableContentException()
    {
        // Arrange
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other", true);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns(new EntityExistence(false, 0));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Know relation creation should fail when to character does not exist");
        result.Error.ShouldBeOfType<UnprocessableContentException>("Error should be UnprocessableContentException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsExceptionAndRollsBack()
    {
        // Arrange
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other", true);
        var expectedException = new Exception("DB error");
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns(new EntityExistence(true, 1));
        _characterRepository
            .CreateKnowRelationAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<LoreWeave.Domain.Entities.Knows.Commands.CreateKnowRelation>())
            .ThrowsAsync(expectedException);

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Result should be failure when repository throws");
        result.Error.ShouldBe(expectedException, "Error should be the thrown exception");
        await _transaction.Received(1).RollbackAsync();
        await _transaction.DidNotReceive().CommitAsync();
    }
}
