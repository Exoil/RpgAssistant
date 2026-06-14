using Neo4j.Driver;

using NSubstitute;
using NSubstitute.ExceptionExtensions;

using LoreWeave.Application.Models;
using LoreWeave.Application.Queries;
using LoreWeave.Application.Queries.QueryHandlers;
using LoreWeave.Domain.Entities.Characters;
using LoreWeave.Domain.Entities.Characters.Commands;
using LoreWeave.Domain.Exceptions;
using LoreWeave.Domain.Extensions;
using LoreWeave.Domain.Factories;
using LoreWeave.Domain.Repositories;

using Serilog;

using Shouldly;

namespace LoreWeave.Application.Test.Queries.QueryHandlers;

public class GetCharacterByIdQueryHandlerTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly GetCharacterByIdQueryHandler _sut;

    private static readonly Guid _characterGuid = Guid.NewGuid();
    private static readonly Ulid _characterUlid = _characterGuid.GuidToUlid();

    public GetCharacterByIdQueryHandlerTest()
    {
        _characterRepository = Substitute.For<ICharacterRepository>();
        var logger = Substitute.For<ILogger>();
        var transaction = Substitute.For<IAsyncTransaction>();
        var transactionFactory = Substitute.For<ITransactionFactory<IAsyncTransaction>>();
        transactionFactory.CreateAsync().Returns(transaction);

        _sut = new GetCharacterByIdQueryHandler(transactionFactory, _characterRepository, logger);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterExists_ReturnsCharacterPayload()
    {
        // Arrange
        var query = new GetCharacterByIdQuery(_characterGuid);
        var character = new Character(new CreateCharacter(_characterUlid, "TestCharacter"), version: 2);
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _characterUlid)
            .Returns((true, character.Version));
        _characterRepository
            .GetAsync(Arg.Any<IAsyncTransaction>(), _characterUlid)
            .Returns(character);

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeTrue("Query should succeed when character exists");
        result.Value.ShouldBeOfType<CharacterPayload>("Result value should be CharacterPayload");
        result.Value.Id.ShouldBe(_characterGuid, "Returned Id should match the requested Id");
        result.Value.Name.ShouldBe("TestCharacter", "Returned Name should match the character name");
        result.Value.Version.ShouldBe(2, "Returned Version should match the character version");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenCharacterDoesNotExist_ReturnsNotFoundException()
    {
        // Arrange
        var query = new GetCharacterByIdQuery(_characterGuid);
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _characterUlid)
            .Returns((false, 0));

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeFalse("Query should fail when character does not exist");
        result.Error.ShouldBeOfType<NotFoundException>("Error should be NotFoundException");
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task InvokeAsync_WhenRepositoryThrows_ReturnsException()
    {
        // Arrange
        var query = new GetCharacterByIdQuery(_characterGuid);
        var expectedException = new Exception("DB error");
        _characterRepository
            .ExistsAsync(Arg.Any<IAsyncTransaction>(), _characterUlid)
            .Returns((true, 1));
        _characterRepository
            .GetAsync(Arg.Any<IAsyncTransaction>(), _characterUlid)
            .ThrowsAsync(expectedException);

        // Act
        var result = await _sut.InvokeAsync(query);

        // Assert
        result.IsSuccess.ShouldBeFalse("Result should be failure when repository throws");
        result.Error.ShouldBe(expectedException, "Error should be the thrown exception");
    }
}
