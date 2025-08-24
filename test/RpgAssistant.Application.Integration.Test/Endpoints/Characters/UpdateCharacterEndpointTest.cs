using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;

using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.Repositories;

using Shouldly;

namespace RpgAssistant.Application.Integration.Test.Endpoints.Characters;

public class UpdateCharacterEndpointTest : IntegrationTestBase
{
    public const string Endpoint = "/characters";

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task UpdateCharacterName()
    {
        // Arrange
        var dataWithUpdate = new
        {
            Name = "UpdatedName",
            Version = 1
        };
        var dataForCreateCharacter = new
        {
            Name = "Test"
        };

        var response = await Client.PostAsJsonAsync(Endpoint, dataForCreateCharacter, CancellationToken.None);
        var characterId = await response.Content.ReadFromJsonAsync<Guid>();

        // Act
        var responseUpdate = await Client.PutAsJsonAsync($"{Endpoint}/{characterId}", dataWithUpdate, CancellationToken.None);

        // Assert
        responseUpdate.StatusCode.ShouldBe(HttpStatusCode.NoContent);
        await AssertCharacter(characterId, dataWithUpdate.Name);
    }


    [Theory]
    [InlineData(0)]
    [InlineData(100)]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task UpdateCharacterWithInvalidNameLength(int stringLength)
    {
        // Arrange
        var dataWithUpdate = new
        {
            Name = new string('*', stringLength),
            Version = 1
        };
        var dataForCreateCharacter = new
        {
            Name = "Test"
        };

        var response = await Client.PostAsJsonAsync(Endpoint, dataForCreateCharacter, CancellationToken.None);
        var characterId = await response.Content.ReadFromJsonAsync<Guid>();

        // Act
        var responseUpdate = await Client.PutAsJsonAsync($"{Endpoint}/{characterId}", dataWithUpdate, CancellationToken.None);

        // Assert
        responseUpdate.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task UpdateCharacterWithOldVersion()
    {
        // Arrange
        var dataWithUpdate = new
        {
            Name = new string('*', 10),
            Version = 0
        };
        var dataForCreateCharacter = new
        {
            Name = "Test"
        };

        var response = await Client.PostAsJsonAsync(Endpoint, dataForCreateCharacter, CancellationToken.None);
        var characterId = await response.Content.ReadFromJsonAsync<Guid>();

        // Act
        var responseUpdate = await Client.PutAsJsonAsync($"{Endpoint}/{characterId}", dataWithUpdate, CancellationToken.None);

        // Assert
        responseUpdate.StatusCode.ShouldBe(HttpStatusCode.Conflict);
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task UpdateNotExistingCharacterName()
    {
        // Arrange
        var characterId = Ulid.NewUlid().ToGuid();
        var dataWithUpdate = new
        {
            Name = "Test",
            Verson = 1
        };

        // Act
        var responseUpdate = await Client.PutAsJsonAsync($"{Endpoint}/{characterId}", dataWithUpdate, CancellationToken.None);

        // Assert
        responseUpdate.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }

    private async Task AssertCharacter(Guid id, string name)
    {
        await using var driver = await GetDriverAsync();
        await using var session = driver.AsyncSession();
        await using var transaction = await session.BeginTransactionAsync();

        var characterRepository = new CharacterRepository(transaction);
        var character =  await characterRepository.GetAsync(id.GuidToUlid());

        character.Name.ShouldBe(name);
    }
}
