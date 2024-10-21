using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models;

public record CreateCharacter : BaseValueObject
{
    protected override string ModelName { get; set; } = nameof(CreateCharacter);
    public string Name;
    public string Description;

    public CreateCharacter(
        string name,
        string description)
    {
        Name = name;
        Description = description;
        
        Validate();
    }

    protected override void Validate()
    {
        
        base.Validate();
    }
};