using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;
using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.Repositories;

using Shouldly;

namespace RpgAssistant.Application.Integration.Test.Endpoints.Characters;

public class CreateCharacterEndpointTest : IntegrationTestBase
{
    public const string Endpoint = "/characters";

    [Fact]
    public async Task Create_Character()
    {
        // Arrange
        var requestPayload = new
        {
            Name = "Test"
        };

        // Act
        var response = await Client.PostAsJsonAsync(Endpoint, requestPayload, CancellationToken.None);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.Created);
        var id = await response.Content.ReadFromJsonAsync<Guid>();
        await AsssertCharacter(id);
    }

    private async Task AsssertCharacter(Guid id)
    {
        await using var driver = await GetDriverAsync();
        await using var session = driver.AsyncSession();
        await using var transaction = await session.BeginTransactionAsync();

        var characterRepository = new CharacterRepository(transaction);
        var character =  await characterRepository.GetAsync(id.GuidToUlid());

        character.Name.ShouldBe(character.Name);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(100)]
    public async Task Create_Character_With_Invalid_Name(int nameLength)
    {
        // Arrange
        var requestPayload = new
        {
            Name = new string('*', nameLength)
        };

        // Act
        var response = await Client.PostAsJsonAsync(Endpoint, requestPayload, CancellationToken.None);

        // Assert
        response.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
        var act = async () => await response.Content.ReadFromJsonAsync<Guid>();
        act.ShouldThrow<Exception>();
    }
}
