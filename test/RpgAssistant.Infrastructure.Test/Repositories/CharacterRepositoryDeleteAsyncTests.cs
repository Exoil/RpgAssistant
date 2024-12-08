using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;
using FluentAssertions;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryDeleteAsyncTests : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryDeleteAsyncTests(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.TestTitle)]
    public async Task Should_Not_Find_Deleted_Character()
    {
        // Arrange
        var createCharacterForTest = new CreateCharacter(
            "CharacterName",
            "TestDescription");
        
        var characterRepository = new CharacterRepository(_container.Driver);
        var characterId = await characterRepository.CreateAsync(createCharacterForTest);
        
        // Act
        await characterRepository.DeleteAsync(characterId);
        
        // Assert
        var act = async () => await characterRepository.GetAsync(characterId);

        await act.Should().ThrowAsync<NotFoundException>();
    }
}