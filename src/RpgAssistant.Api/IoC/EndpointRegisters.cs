namespace RpgAssistant.Api.IoC;

public static class EndpointRegisters
{
    public static void RegisterUtilitiesEndpoints(
        this WebApplication webApplication)
    {
        string LocalFunction() => "RpgAssistant version 1.0.0";
        webApplication
            .MapGet("/", LocalFunction)
            .Produces<string>();
    }
}