using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using Loreweave.Application.Commands;
using Loreweave.Application.Commands.CommandHandlers;
using Loreweave.Domain.Exceptions;
using Loreweave.Domain.Factories;
using Loreweave.Domain.Repositories;

using Serilog;

using Shouldly;

namespace Loreweave.Application.Test.Commands.CommandHandlers;

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
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns((true, 1));
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns((true, 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Know relation creation should succeed when both characters exist");
        result.Value.ShouldNotBe(default(Ulid), "Returned ULID should not be empty");
        await _transaction.Received(1).CommitAsync();
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenFromCharacterDoesNotExist_ReturnsUnprocessableContentException()
    {
        // Arrange
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns((false, 0));

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
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns((true, 1));
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns((false, 0));

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
        var command = new CreateKnowRelationCommand(_fromCharacterId, _toCharacterId, "They know each other");
        var expectedException = new Exception("DB error");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _fromCharacterId)
            .Returns((true, 1));
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _toCharacterId)
            .Returns((true, 1));
        _characterRepository
            .CreateKnowRelationAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Loreweave.Domain.Entities.Knows.Commands.CreateKnowRelation>())
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
