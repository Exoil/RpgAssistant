using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Infrastructure.Models;

public record Page : BaseValueObject
{
    [Range(minimum: PageConstants.NumberMin, maximum: PageConstants.NumberMax, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public uint Number { get; }
    
    [Range(minimum: PageConstants.SizeMin, maximum: PageConstants.SizeMax, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public uint Size { get; }
    
    public Page(
        uint number,
        uint size)
    {
        Number = number;
        Size = size;
        
        Validate();
    }
}