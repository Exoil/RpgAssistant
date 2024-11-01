using RpgAssistant.Application.Models;

namespace RpgAssistant.Api.Dtos;

public record CharacterDetails
{
    public Guid Id { get; }
    public string Name { get; }
    public string Description { get; }

    public CharacterDetails(
        RpgAssistant.Application.Models.CharacterDetails characterDetails)
    {
        Id = characterDetails.Id;
        Name = characterDetails.Name;
        Description = characterDetails.Description;
    }
};