using System;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;

using Shouldly;

namespace RpgAssistant.Application.Integration.Test.Endpoints.Characters;

public class CreateKnowRelationEndpointTest : IntegrationTestBase
{
    public const string CharacterEndpoint = "/v1/characters";

    public const string KnowEndpoint = "/v1/characters/knows";

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task Create_KnowRelation_CreatedStatusCode()
    {
        // Arrange
        var requestCreateCharacterFrom = new
        {
            Name = "From"
        };

        var requestCreateCharacterTo = new
        {
            Name = "To"
        };

        var fromCharacterCreateResponse = await Client.PostAsJsonAsync(CharacterEndpoint, requestCreateCharacterFrom, CancellationToken.None);
        var toCharacterCreateResponse = await Client.PostAsJsonAsync(CharacterEndpoint, requestCreateCharacterTo, CancellationToken.None);

        var fromCharacterId =  await fromCharacterCreateResponse.Content.ReadFromJsonAsync<Guid>();
        var toCharacterId = await toCharacterCreateResponse.Content.ReadFromJsonAsync<Guid>();

        var createRelationRequest = new
        {
            FromCharacterId = fromCharacterId,
            ToCharacterId = toCharacterId,
            Description = "Test"
        };

        // Act
        var response = await Client.PostAsJsonAsync(KnowEndpoint, createRelationRequest, CancellationToken.None);

        response.StatusCode.ShouldBe(HttpStatusCode.Created);
        var id = await response.Content.ReadFromJsonAsync<Guid>();
        id.ShouldNotBe(Guid.Empty);
    }
}
