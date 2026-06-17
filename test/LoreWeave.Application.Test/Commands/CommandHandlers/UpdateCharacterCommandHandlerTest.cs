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

public class UpdateCharacterCommandHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly IAsyncTransaction _transaction;
    private readonly UpdateCharacterCommandHandler _sut;

    private static readonly Guid CharacterId = Guid.NewGuid();
    private const int CurrentVersion = 1;

    public UpdateCharacterCommandHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        var logger = Substitute.For<ILogger>();
        _transaction = Substitute.For<IAsyncTransaction>();
        var transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        transactionFactory.CreateAsync().Returns(_transaction);

        _sut = new UpdateCharacterCommandHandler(transactionFactory, _characterRepository, logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterExistsAndVersionMatches_ReturnsSuccess()
    {
        // Arrange
        var command = new UpdateCharacterCommand(CharacterId, "UpdatedName", CurrentVersion);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns(new EntityExistence(true, CurrentVersion));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Update should succeed when character exists and version matches");
        await _transaction.Received(1).CommitAsync();
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterDoesNotExist_ReturnsNotFoundException()
    {
        // Arrange
        var command = new UpdateCharacterCommand(CharacterId, "UpdatedName", CurrentVersion);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns(new EntityExistence(false, 0));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Update should fail when character does not exist");
        result.Error.ShouldBeOfType<NotFoundException>("Error should be NotFoundException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenVersionDoesNotMatch_ReturnsPreconditionException()
    {
        // Arrange
        var command = new UpdateCharacterCommand(CharacterId, "UpdatedName", CurrentVersion);
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns(new EntityExistence(true, CurrentVersion + 1));

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeFalse("Update should fail when version does not match");
        result.Error.ShouldBeOfType<PreconditionException>("Error should be PreconditionException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsExceptionAndRollsBack()
    {
        // Arrange
        var command = new UpdateCharacterCommand(CharacterId, "UpdatedName", CurrentVersion);
        var expectedException = new Exception("DB error");
        _characterRepository
            .CharacterExistsAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>())
            .Returns(new EntityExistence(true, CurrentVersion));
        _characterRepository
            .UpdateAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<Ulid>(), Arg.Any<LoreWeave.Domain.Entities.Characters.Commands.UpdateCharacter>())
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
