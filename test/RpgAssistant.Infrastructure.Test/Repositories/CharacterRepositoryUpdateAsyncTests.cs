using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryUpdateAsyncTests : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryUpdateAsyncTests(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task Should_Character_Have_Updated_Name_And_Description_Success()
    {
        // Arrange
        var createCharacterForTest = new CreateCharacter(
            "CharacterName",
            "TestDescription");
        
        var characterRepository = new CharacterRepository(_container.Driver);
        var characterId = await characterRepository.CreateAsync(createCharacterForTest);
        
        // Act
        var updatedCharacter = new UpdateCharacter(characterId, "UpdatedCharacterName", "UpdatedTestDescription");
        await characterRepository.UpdateAsync(updatedCharacter);
        
        //Assert
        var retrievedCharacter = await characterRepository.GetAsync(updatedCharacter.Id);
        retrievedCharacter.Should().NotBeNull();
        retrievedCharacter.Name.Should().Be(updatedCharacter.Name);
        retrievedCharacter.Description.Should().Be(updatedCharacter.Description);
    }
}