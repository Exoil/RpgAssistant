using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;

using RpgAssistant.Domain.Extensions;
using RpgAssistant.Infrastructure.Repositories;

using Shouldly;

namespace RpgAssistant.Application.Integration.Test.Endpoints.Characters;

public class DeleteCharacterEndpointTest : IntegrationTestBase
{
    public const string Endpoint = "/v1/characters";

    [Fact]
    public async Task DeleteCharacter_GetNoContent()
    {
        // Arrange
        var dataForCreateCharacter = new
        {
            Name = "Test"
        };

        var response = await Client.PostAsJsonAsync(Endpoint, dataForCreateCharacter, CancellationToken.None);
        var characterId = await response.Content.ReadFromJsonAsync<Guid>();

        // Act
        var responseDelete = await Client.DeleteAsync($"{Endpoint}/{characterId}", CancellationToken.None);

        // Assert
        responseDelete.StatusCode.ShouldBe(HttpStatusCode.NoContent);
        await CheckCharacterDeleted(characterId);
    }

    [Fact]
    public async Task DeleteCharacter_With_Not_Existing_Id_GetNotFound()
    {
        // Arrange
        var characterId = Ulid.NewUlid().ToGuid();

        // Act
        var responseDelete = await Client.DeleteAsync($"{Endpoint}/{characterId}", CancellationToken.None);

        // Assert
        responseDelete.StatusCode.ShouldBe(HttpStatusCode.NotFound);
    }

    private async Task CheckCharacterDeleted(Guid id)
    {
        await using var driver = await GetDriverAsync();
        await using var session = driver.AsyncSession();
        await using var transaction = await session.BeginTransactionAsync();

        var characterRepository = new CharacterRepository(transaction);
        var exists =  await characterRepository.ExistsAsync(id.GuidToUlid());

        exists.Exists.ShouldBeFalse();
    }
}
