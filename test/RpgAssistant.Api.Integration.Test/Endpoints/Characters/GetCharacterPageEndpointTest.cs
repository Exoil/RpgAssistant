using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;

using RpgAssistant.Application.Models;

using Shouldly;

namespace RpgAssistant.Api.Integration.Test.Endpoints.Characters;

public class GetCharacterPageEndpointTest : IntegrationTestBase
{
    public const string Endpoint = "/v1/characters";

    public const string KnowEndpoint = "/v1/characters/knows";

    [Theory]
    [InlineData(1, 10, "Name", "Asc")]
    [InlineData(1, 10, "Name", "Desc")]
    public async Task GetCharacterPage_GetOk(int pageNumber, int pageSize, string sortType, string sortOrder)
    {
        // Arrange
        await _neo4JContainerRunner.ResetAsync();
        var expectedNames = Enumerable.Range(0, pageSize).Select(i => $"Test{i}").ToList();

        if (sortOrder == "Desc")
        {
            expectedNames.Reverse();
        }

        var dataToCreateCharacter = new List<object>();

        foreach (var name in expectedNames)
        {
            dataToCreateCharacter.Add(new
            {
                Name = name
            });
        }

        var characterIds = new List<Guid>();

        foreach (var dataToCreate in dataToCreateCharacter)
        {
            var response = await Client.PostAsJsonAsync(Endpoint, dataToCreate, CancellationToken.None);
            var characterId = await response.Content.ReadFromJsonAsync<Guid>();
            characterIds.Add(characterId);
        }

        var idFrom = Guid.Empty;
        var idTo = Guid.Empty;
        for (var i = 0; i < characterIds.Count; i++)
        {
            idFrom = characterIds[i];

            if (i == characterIds.Count - 1)
            {
                idTo = characterIds[0];
            }
            else
            {
                idTo = characterIds[(i + 1)];
            }
            var createRelationRequest = new
            {
                FromCharacterId = idFrom,
                ToCharacterId = idTo,
                Description = "Test"
            };

            await Client.PostAsJsonAsync(KnowEndpoint, createRelationRequest, CancellationToken.None);
        }

        var endpoint =
            $"{Endpoint}?pageNumber={pageNumber}&pageSize={pageSize}&sortType={sortType}&sortOrder={sortOrder}";

        // Act
        var reponse = await Client.GetAsync(endpoint);

        // Assert
        reponse.StatusCode.ShouldBe(HttpStatusCode.OK);

        var content = await reponse.Content.ReadFromJsonAsync<IEnumerable<CharacterPayloadWithRelations>>();
        var list = content!.ToList();

        list.Select(c => c.Name).ShouldBe(expectedNames);
        list.All(c => characterIds.Contains(c.Id)).ShouldBeTrue();
        list.ShouldAllBe(c => c.KnowCharacterIds.Count == 1);
    }


    [Theory]
    [InlineData(1, 10, "Name", "Ascc")]
    [InlineData(1, 10, "Name", "Descc")]
    [InlineData(0, 10, "Name", "Desc")]
    [InlineData(1, 0, "Name", "Desc")]
    public async Task GetCharacterPage_GetBadRequest(int pageNumber, int pageSize, string sortType, string sortOrder)
    {
        // Arrange
        var endpoint =
            $"{Endpoint}?pageNumber={pageNumber}&pageSize={pageSize}&sortType={sortType}&sortOrder={sortOrder}";

        // Act
        var reponse = await Client.GetAsync(endpoint);

        // Assert
        reponse.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
    }
}
