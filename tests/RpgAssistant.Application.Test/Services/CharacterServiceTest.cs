using NSubstitute;
using Shouldly;
using RpgAssistant.Application.Models.Characters;
using RpgAssistant.Application.Services;
using RpgAssistant.Application.Services.Interfaces;
using RpgAssistant.Infrastructure.Repositories.Interfaces;
using Serilog;

namespace RpgAssistant.Application.Test.Services;

public class CharacterServiceTest
{
    private readonly ICharacterRepository _characterRepository;
    private readonly TimeProvider _timeProvider;
    private readonly ILogger _logger;
    private readonly ICharacterService _characterService;

    public CharacterServiceTest()
    {
        // Setup mocks
        _characterRepository = Substitute.For<ICharacterRepository>();
        _timeProvider = Substitute.For<TimeProvider>();
        _logger = Substitute.For<ILogger>();

        // Setup service with mocks
        _characterService = new CharacterService(
            _characterRepository,
            _timeProvider,
            _logger
        );
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task CreateAsync_ShouldReturnUlid_WhenRepositorySucceeds()
    {
        // Arrange
        var dateTimeOffset = new DateTimeOffset(2023, 1, 1, 12, 0, 0, TimeSpan.Zero);
        _timeProvider.GetUtcNow().Returns(dateTimeOffset);

        var createCharacter = new CreateCharacter("Test Character");

        // Act
        var result = await _characterService.CreateAsync(createCharacter);

        // Assert
        result.IsSuccess.ShouldBeTrue();
        result.Value.ShouldNotBe(default(Ulid));

        // Verify repository was called with correct parameters
        await _characterRepository.Received(1).CreateAsync(
            Arg.Is<Infrastructure.Models.Characters.CreateCharacter>(c =>
                c.Name == createCharacter.Name &&
                c.CreateDateTimeOffset == dateTimeOffset &&
                c.Timestamp == dateTimeOffset.ToUnixTimeMilliseconds()),
            Arg.Any<CancellationToken>());
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task CreateAsync_ShouldReturnException_WhenRepositoryThrowsException()
    {
        // Arrange
        var dateTimeOffset = new DateTimeOffset(2023, 1, 1, 12, 0, 0, TimeSpan.Zero);
        _timeProvider.GetUtcNow().Returns(dateTimeOffset);

        var createCharacter = new CreateCharacter("Test Character");
        var expectedException = new Exception("Test exception");

        _characterRepository
            .When(x => x.CreateAsync(Arg.Any<Infrastructure.Models.Characters.CreateCharacter>(), Arg.Any<CancellationToken>()))
            .Do(_ => throw expectedException);

        // Act
        var result = await _characterService.CreateAsync(createCharacter);

        // Assert
        result.IsSuccess.ShouldBeFalse();
        result.Error.ShouldBe(expectedException);
    }
}
