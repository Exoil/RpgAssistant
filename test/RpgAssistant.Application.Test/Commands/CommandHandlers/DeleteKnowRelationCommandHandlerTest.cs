using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using RpgAssistant.Application.Commands;
using RpgAssistant.Application.Commands.CommandHandlers;
using RpgAssistant.Domain.Factories;
using RpgAssistant.Domain.Repositories;

using Serilog;

using Shouldly;

namespace RpgAssistant.Application.Test.Commands.CommandHandlers;

public class DeleteKnowRelationCommandHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly IAsyncTransaction _transaction;
    private readonly DeleteKnowRelationCommandHandler _sut;

    private static readonly Ulid _fromCharacterId = Ulid.NewUlid();
    private static readonly Ulid _toCharacterId = Ulid.NewUlid();

    public DeleteKnowRelationCommandHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        var logger = Substitute.For<ILogger>();
        _transaction = Substitute.For<IAsyncTransaction>();
        var transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        transactionFactory.CreateAsync().Returns(_transaction);

        _sut = new DeleteKnowRelationCommandHandler(transactionFactory, _characterRepository, logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRelationExists_ReturnsSuccess()
    {
        // Arrange
        var command = new DeleteKnowRelationCommand(_fromCharacterId, _toCharacterId);

        // Act
        var result = await _sut.InvokeAsync(command);

        // Assert
        result.IsSuccess.ShouldBeTrue("Know relation deletion should succeed");
        await _transaction.Received(1).CommitAsync();
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsExceptionAndRollsBack()
    {
        // Arrange
        var command = new DeleteKnowRelationCommand(_fromCharacterId, _toCharacterId);
        var expectedException = new Exception("DB error");
        _characterRepository
            .DeleteKnowRelationAsync(Arg.Any<IAsyncTransaction>(), Arg.Any<RpgAssistant.Domain.Entities.Knows.Commands.DeleteKnowRelation>())
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
