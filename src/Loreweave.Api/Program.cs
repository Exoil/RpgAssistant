using Loreweave.Api.Endpoints;
using Loreweave.Api.IoC;
using Loreweave.Application.IoC;
using Loreweave.Infrastructure.IoC;

using Steeltoe.Configuration.Placeholder;

namespace Loreweave.Api;

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
        builder.Configuration.AddPlaceholderResolver();

        // Services
        builder.Services.RegisterGraphDb(builder.Configuration);
        builder.Services.RegisterHandlers();
        builder.Host.ConfigureLogger(builder.Configuration);
        builder.Services.RegisterResultsResolvers();

        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                policy
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithExposedHeaders("ETag", "Date", "Location")
            );
        });

        var app = builder.Build();

        // Middleware and endpoints
        app.UseHttpsRedirection();
        app.UseCors();
        app.MapUtilityEndpoints();
        app.MapCharacterEndpoints();

        return app;
    }
}
