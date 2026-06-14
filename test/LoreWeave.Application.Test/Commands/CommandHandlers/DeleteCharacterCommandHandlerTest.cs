using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using LoreWeave.Application.Commands;
using LoreWeave.Application.Commands.CommandHandlers;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using Serilog;

using Shouldly;

namespace LoreWeave.Application.Test.Commands.CommandHandlers;

public class DeleteCharacterCommandHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly IAsyncTransaction _transaction;
    private readonly DeleteCharacterCommandHandler _sut;

    private static readonly Guid _characterId = Guid.NewGuid();

    public DeleteCharacterCommandHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        var logger = Substitute.For<ILogger>();
        _transaction = Substitute.For<IAsyncTransaction>();
        var transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        transactionFactory.CreateAsync().Returns(_transaction);

        _sut = new DeleteCharacterCommandHandler(transactionFactory, _characterRepository, logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterExists_ReturnsSuccess()
    {
        // Arrange
        var command = new DeleteCharacterCommand(_characterId);
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns((true, 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Delete should succeed when character exists");
        await _transaction.Received(1).CommitAsync();
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterDoesNotExist_ReturnsNotFoundException()
    {
        // Arrange
        var command = new DeleteCharacterCommand(_characterId);
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns((false, 0));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Delete should fail when character does not exist");
        result.Error.ShouldBeOfType<NotFoundException>("Error should be NotFoundException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsExceptionAndRollsBack()
    {
        // Arrange
        var command = new DeleteCharacterCommand(_characterId);
        var expectedException = new Exception("DB error");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns((true, 1));
        _characterRepository
            .DeleteAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<LoreWeave.Domain.Entities.Characters.Commands.DeleteCharacter>())
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
