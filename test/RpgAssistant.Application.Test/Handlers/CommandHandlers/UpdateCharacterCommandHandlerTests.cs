using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.CommandHandlers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.CommandHandlers;

public class UpdateCharacterCommandHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnSuccess_WhenRepositoryCallSucceeds()
    {
        // Arrange
        var command = new UpdateCharacterCommand(Ulid.NewUlid(), "Updated Name", "Updated Description");
        var repository = Substitute.For<ICharacterRepository>();
        repository.UpdateAsync(Arg.Any<UpdateCharacterCommand>(), Arg.Any<CancellationToken>())
            .Returns(Task.CompletedTask);
        var handler = new UpdateCharacterCommandHandler(repository);

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
        var command = new UpdateCharacterCommand(Ulid.NewUlid(), "Updated Name", "Updated Description");
        var repository = Substitute.For<ICharacterRepository>();
        repository.UpdateAsync(Arg.Any<UpdateCharacterCommand>(), Arg.Any<CancellationToken>())
            .ThrowsAsync(new Exception("Test exception"));
        var handler = new UpdateCharacterCommandHandler(repository);

        // Act
        var result = await handler.Handle(command, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeFalse();
    }
} 