using System.ComponentModel.DataAnnotations;
using RpgAssistant.Domain.Constants;

namespace RpgAssistant.Infrastructure.Models;

public record Page
{
    [Range(minimum: PageConstants.NumberMin, maximum: PageConstants.NumberMax, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public uint Number { get; }
    
    [Range(minimum: PageConstants.SizeMin, maximum: PageConstants.SizeMax, ErrorMessage = ValidationErrorMessages.RangeErrorMessage)]
    public uint Size { get; }
}