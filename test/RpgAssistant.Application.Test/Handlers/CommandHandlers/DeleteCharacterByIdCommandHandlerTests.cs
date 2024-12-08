using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.CommandHandlers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.CommandHandlers;

public class DeleteCharacterByIdCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnSuccess_WhenRepositoryCallSucceeds()
    {
        // Arrange
        var command = new DeleteCharacterByIdCommand(Ulid.NewUlid());
        var repository = Substitute.For<ICharacterRepository>();
        repository.DeleteAsync(Arg.Any<Ulid>()).Returns(Task.CompletedTask);
        var handler = new DeleteCharacterByIdCommandHandler(repository);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeTrue();
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenRepositoryThrowsException()
    {
        // Arrange
        var command = new DeleteCharacterByIdCommand(Ulid.NewUlid());
        var repository = Substitute.For<ICharacterRepository>();
        repository.DeleteAsync(Arg.Any<Ulid>()).ThrowsAsync(new Exception("Test"));
        var handler = new DeleteCharacterByIdCommandHandler(repository);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeFalse();
    }
} 