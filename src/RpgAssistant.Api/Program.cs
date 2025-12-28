using RpgAssistant.Api.Endpoints;
using RpgAssistant.Api.IoC;
using RpgAssistant.Application.IoC;
using RpgAssistant.Infrastructure.IoC;

namespace RpgAssistant.Api;

public class Program
{
    public static void Main(string[] args)
    {
        var app = BuildApp(args);
        app.Run();
    }

    // Exposed builder to support tests if needed
    private static WebApplication BuildApp(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Services
        builder.Services.RegisterGraphDb(builder.Configuration);
        builder.Services.RegisterHandlers();
        builder.Host.ConfigureLogger(builder.Configuration);
        builder.Services.RegisterResultsResolvers();

        var app = builder.Build();

        // Middleware and endpoints
        app.UseHttpsRedirection();
        app.MapUtilityEndpoints();
        app.MapCharacterEndpoints();

        return app;
    }
}
