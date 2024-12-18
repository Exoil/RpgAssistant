using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.QueryHandlers;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.QueryHandlers;

public class GetCharacterByIdQueryHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnCharacterDetails_WhenRepositoryCallSucceeds()
    {
        // Arrange
        var characterId = Ulid.NewUlid();
        var character = new Character(
            characterId,
            "Test Character",
            "Test Description",
            new List<Ulid>()
        );

        var repository = Substitute.For<ICharacterRepository>();
        repository.GetAsync(Arg.Any<Ulid>(), Arg.Any<CancellationToken>())
            .Returns(Task.FromResult(character));

        var handler = new GetCharacterByIdQueryHandler(repository);
        var query = new GetCharacterByIdQuery(characterId);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().NotBeNull();
        result.Value.Id.Should().Be(characterId.ToGuid());
        result.Value.Name.Should().Be("Test Character");
        result.Value.Description.Should().Be("Test Description");
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenRepositoryThrowsException()
    {
        // Arrange
        var characterId = Ulid.NewUlid();
        var repository = Substitute.For<ICharacterRepository>();
        repository.GetAsync(Arg.Any<Ulid>(), Arg.Any<CancellationToken>())
            .ThrowsAsync(new Exception("Test exception"));

        var handler = new GetCharacterByIdQueryHandler(repository);
        var query = new GetCharacterByIdQuery(characterId);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeFalse();
    }
} 