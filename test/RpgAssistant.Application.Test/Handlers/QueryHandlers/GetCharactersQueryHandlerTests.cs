using System.Collections.Immutable;
using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.QueryHandlers;
using RpgAssistant.Application.Handlers.QueryHandlers.Queries;
using RpgAssistant.Domain.Entities;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.QueryHandlers;

public class GetCharactersQueryHandlerTests
{
    [Fact]
    public async Task Handle_ShouldReturnCharacterDetailsList_WhenRepositoryCallSucceeds()
    {
        // Arrange
        var characters = new List<Character>()
        {
            new(Ulid.NewUlid(), "Character 1", "Description 1", new List<Ulid>()),
            new(Ulid.NewUlid(), "Character 2", "Description 2", new List<Ulid>()),
        };

        var repository = Substitute.For<ICharacterRepository>();
        repository.GetAsync(Arg.Any<GetCharactersQuery>(), Arg.Any<CancellationToken>())
            .Returns(Task.FromResult(characters.ToImmutableArray()));

        var handler = new GetCharactersQueryHandler(repository);
        var query = new GetCharactersQuery(0, 50);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeTrue();
        result.Value.Should().HaveCount(2);
        result.Value[0].Name.Should().Be("Character 1");
        result.Value[1].Name.Should().Be("Character 2");
    }

    [Fact]
    public async Task Handle_ShouldReturnFailure_WhenRepositoryThrowsException()
    {
        // Arrange
        var repository = Substitute.For<ICharacterRepository>();
        repository.GetAsync(Arg.Any<GetCharactersQuery>(), Arg.Any<CancellationToken>())
            .ThrowsAsync(new Exception("Test exception"));

        var handler = new GetCharactersQueryHandler(repository);
        var query = new GetCharactersQuery(0, 50);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        result.Should().NotBeNull();
        result.IsSuccess.Should().BeFalse();
    }
} 