using FluentAssertions;
using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryCreateAsyncTest 
    : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryCreateAsyncTest(Neo4jContainer container)
    {
        _container = container;
    }
    
    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task Create_Character_No_Throw_Exception()
    {
        // Arrange
        var characterCreate = new CreateCharacter(
            "CharacterName", 
            "TestDescription");
        await using var characterRepository = new CharacterRepository(_container.Driver);

        // Act
        var id = await characterRepository.CreateAsync(characterCreate, CancellationToken.None);

        // Assert
        id.Should().NotBe(Ulid.Empty);
        
        var character = await characterRepository.GetAsync(id, CancellationToken.None);
        character.Id.Should().Be(id);
        character.Name.Should().Be(characterCreate.Name);
        character.Description.Should().Be(characterCreate.Description);
    }
}