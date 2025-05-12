using RpgAssistant.Api.IoC;
using RpgAssistant.Api.IoC.Endpoints;
using RpgAssistant.API.Middleware;
using Serilog;

namespace RpgAssistant.Api;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder
            .Services
            .AddSingleton(TimeProvider.System);
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(builder.Configuration)
            .CreateLogger();
        builder.Host.UseSerilog((context, services, configuration) => configuration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services));

// Use custom Swagger configuration instead of the default
        builder.Services.AddCustomSwagger();
        builder.Services.AddApi(builder.Configuration);
        builder.Services.AddHealthChecks()
            .AddApiHealthChecks();

        var app = builder.Build();


        app.UseCustomSwagger(app.Environment);

        app.UseMiddleware<ValidationExceptionMiddleware>();
        app.UseHttpsRedirection();
        app.AddHealthCheckEndpoint();
        app.AddVersionEndpoint();
        app.AddCharacterEndpoints();

        await app.RunAsync();
    }
}
