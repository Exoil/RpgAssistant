using Serilog;

namespace Loreweave.Api.IoC;

public static class AppLoggerConfiguration
{
    public static void ConfigureLogger(this IHostBuilder hostBuilder, IConfiguration configuration)
    {
        Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(configuration)
            .CreateLogger();
        hostBuilder.UseSerilog((context, services, logConfiguration) => logConfiguration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services));
    }
}
