using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Json;
using System.Threading;
using System.Threading.Tasks;

using RpgAssistant.Api.Dtos;
using RpgAssistant.Application.Models;

using Shouldly;

namespace RpgAssistant.Api.Integration.Test.Endpoints.Characters;

public class GetCharacterPageEndpointTest : IntegrationTestBase
{
    public const string Endpoint = "/v1/characters";

    [Theory]
    [InlineData(1,10,"Name", "Asc")]
    [InlineData(1,10,"Name", "Desc")]
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
        var charadterIds = new List<Guid>();

        foreach (var dataToCreate in dataToCreateCharacter)
        {
            var response = await Client.PostAsJsonAsync(Endpoint, dataToCreate, CancellationToken.None);
            var characterId = await response.Content.ReadFromJsonAsync<Guid>();
            charadterIds.Add(characterId);
        }

        var endpoint = $"{Endpoint}?pageNumber={pageNumber}&pageSize={pageSize}&sortType={sortType}&sortOrder={sortOrder}";

        // Act
        var reponse = await Client.GetAsync(endpoint);

        // Assert
        reponse.StatusCode.ShouldBe(HttpStatusCode.OK);

        var content = await reponse.Content.ReadFromJsonAsync<IEnumerable<CharacterPayload>>();
        var list = content!.ToList();

        list.Select(c => c.Name).ShouldBe(expectedNames);
        list.All(c => charadterIds.Contains(c.Id)).ShouldBeTrue();
        list.Select(c => c.Id).ToHashSet().Count.ShouldBe(pageSize);
    }


    [Theory]
    [InlineData(1,10,"Name", "Ascc")]
    [InlineData(1,10,"Name", "Descc")]
    [InlineData(0,10,"Name", "Desc")]
    [InlineData(1,0,"Name", "Desc")]
    public async Task GetCharacterPage_GetBadRequest(int pageNumber, int pageSize, string sortType, string sortOrder)
    {
        // Arrange
        var endpoint = $"{Endpoint}?pageNumber={pageNumber}&pageSize={pageSize}&sortType={sortType}&sortOrder={sortOrder}";

        // Act
        var reponse = await Client.GetAsync(endpoint);

        // Assert
        reponse.StatusCode.ShouldBe(HttpStatusCode.BadRequest);
    }
}
