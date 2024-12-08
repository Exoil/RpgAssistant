using RpgAssistant.Infrastructure.Models;
using RpgAssistant.Infrastructure.Repositories;
using RpgAssistant.Infrastructure.Test.Containers;
using FluentAssertions;

namespace RpgAssistant.Infrastructure.Test.Repositories;

public class CharacterRepositoryGetListOfCharactersTests : IClassFixture<Neo4jContainer>
{
    private readonly Neo4jContainer _container;

    public CharacterRepositoryGetListOfCharactersTests(Neo4jContainer container)
    {
        _container = container;
    }

    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task Should_Return_CharacterCollection_With_Count_Two()
    {
        // Arrange
        var characterCreateList = new List<CreateCharacter>()
            { 
                new(
                "CharacterName", 
                "TestDescription"),
                new(
                    "CharacterNameTwo", 
                    "TestDescriptionTwo")
            };
        await using var characterRepository = new CharacterRepository(_container.Driver);
        
        await characterRepository.CreateAsync(characterCreateList[0], CancellationToken.None);
        await characterRepository.CreateAsync(characterCreateList[1], CancellationToken.None);

        var page = new Page(0, (uint)characterCreateList.Count);
        
        // Act
        var characterList = await characterRepository.GetAsync(page, CancellationToken.None);
        
        // Assert
        characterList.Length.Should().Be(characterCreateList.Count);
        characterList.Should().AllSatisfy(x =>
        {
            var characterExists = characterCreateList.Exists(y => y.Name == x.Name && y.Description == x.Description);
            characterExists.Should().BeTrue();
        });
    }
    
    [Fact]
    [Trait(Constants.TraitName, Constants.TestTitle)]
    public async Task Should_Return_CharacterCollection_With_Count_Zero_When_Page_Number_Is_Ten_Size_Is_Two()
    {
        // Arrange
        var characterCreateList = new List<CreateCharacter>()
        { 
            new(
                "CharacterNamess", 
                "TestDescriptionss"),
            new(
                "CharacterNameTwoss", 
                "TestDescriptionTwoss")
        };
        await using var characterRepository = new CharacterRepository(_container.Driver);
        
        await characterRepository.CreateAsync(characterCreateList[0], CancellationToken.None);
        await characterRepository.CreateAsync(characterCreateList[1], CancellationToken.None);

        var page = new Page(10, (uint)characterCreateList.Count);
        
        // Act
        var characterList = await characterRepository.GetAsync(page, CancellationToken.None);
        
        // Assert
        characterList.Length.Should().Be(0);
    }
}