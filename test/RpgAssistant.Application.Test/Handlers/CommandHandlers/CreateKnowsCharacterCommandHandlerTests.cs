using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.CommandHandlers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.CommandHandlers;

public class CreateKnowsCharacterCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnSuccess_WhenRepositoryCallSucceeds()
    {
        // Arrange
        var command = new CreateKnowsCharacterCommand(
            Guid.NewGuid(),
            Guid.NewGuid());

        var repository = Substitute.For<ICharacterRepository>();
        repository
            .CreateKnowsRelationAsync(Arg.Any<Ulid>(), Arg.Any<Ulid>(), Arg.Any<CancellationToken>())
            .Returns(Task.CompletedTask);
        var handler = new CreateKnowsCharacterCommandhandler(repository);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task Handle_ShouldReturnException_WhenRepositoryThrowsException()
    {
        // Arrange
        var command = new CreateKnowsCharacterCommand(
            Guid.NewGuid(),
            Guid.NewGuid());
        var repository = Substitute.For<ICharacterRepository>();
        repository
            .CreateKnowsRelationAsync(Arg.Any<Ulid>(), Arg.Any<Ulid>(), Arg.Any<CancellationToken>())
            .ThrowsAsync(new Exception("Test"));
        var handler = new CreateKnowsCharacterCommandhandler(repository);
        
        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeFalse();
    }
}