using System.Net.Http.Json;

using Neo4j.Driver;

using Shouldly;

namespace RpgAssistant.Api.Test.Endpoints.Characters;

public class CreateCharacterTest : IntegrationTestBase
{
    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task CreateCharacter_ShouldSucceed()
    {
        // Arrange
        var createDate = TimeProvider.GetUtcNow();

        var createCharacterRequest = new
        {
            Name = "Test Character"
        };

        // Act
        var response = await Client.PostAsJsonAsync("/characters", createCharacterRequest);

        // Assert
        response.EnsureSuccessStatusCode();
        var createdCharacterId = await response.Content.ReadFromJsonAsync<string>();
        createdCharacterId.ShouldNotBeNullOrEmpty();

        // Verify in Neo4j
        await using var driver = await GetDriverAsync();
        await using var session = driver.AsyncSession();

        var result = await session.RunAsync(
            "MATCH (c:Character) WHERE c.Id = $id RETURN c",
            new { id = createdCharacterId });

        var record = await result.SingleAsync();
        var character = record["c"].As<INode>();

        character["Name"].As<string>().ShouldBe("Test Character");
        character["CreateDateTimeOffset"].As<DateTimeOffset>().ShouldBe(createDate);
    }

}
