using Microsoft.Extensions.Diagnostics.HealthChecks;

using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;

using Shouldly;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class UtilityGraphRepositoryTest : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public UtilityGraphRepositoryTest(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task Should_Return_Ulid_When_CreateAsync_Is_Called_With_Valid_CreateCharacter()
    {
        // Arrange
        await using var utilityRepository = new UtilityGraphRepository(_container.Driver);

        // Act
        var healthCheckContext = new HealthCheckContext();
        var result = await utilityRepository.CheckHealthAsync(healthCheckContext);

        // Assert
        result.Status.ShouldBe(HealthStatus.Healthy);
    }
}
