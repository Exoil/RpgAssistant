using Microsoft.Extensions.FileProviders;

using RpgAssistant.Application.IoC;
using Microsoft.AspNetCore.StaticFiles;

using RpgAssistant.Api.Resolvers;

namespace RpgAssistant.Api.IoC;

public static class ApiRegisters
{
    static internal IServiceCollection AddApi(
        this IServiceCollection services,
        IConfiguration configuration) =>
            services
                .AddApplication(configuration)
                .AddHttpContextAccessor()
                .AddScoped<ResultResolver>();


    static internal IHealthChecksBuilder AddApiHealthChecks(
        this IHealthChecksBuilder builder) =>
            builder.AddApplicationHealthChecks();

    public static IServiceCollection AddCustomSwagger(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        return services;
    }

    public static IApplicationBuilder UseCustomSwagger(this IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (!env.IsDevelopment())
        {
            return app;
        }

        // Ensure the directory exists for OpenAPI YAML
        var openApiDir = Path.Combine(env.ContentRootPath, "Documents");

        if (!Directory.Exists(openApiDir))
        {
            return app;
        }

        // Updated path: Look for the YAML file in Documents directory
        var yamlSource = Path.Combine(env.ContentRootPath, "Documents", "RpgAssistantContract.yaml");

        Console.WriteLine($"Source YAML path: {yamlSource}");
        Console.WriteLine($"Source YAML exists: {File.Exists(yamlSource)}");

        // Configure content types for YAML
        var provider = new FileExtensionContentTypeProvider();
        provider.Mappings[".yaml"] = "application/x-yaml";
        provider.Mappings[".yml"] = "application/x-yaml";

        // Serve the YAML file as a static file
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(openApiDir),
            RequestPath = "/Documents",
            ContentTypeProvider = provider,
            ServeUnknownFileTypes = true
        });

        // Configure Swagger
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/Documents/RpgAssistantContract.yaml", "RpgAssistant API");
            c.RoutePrefix = "swagger";
        });

        return app;
    }
}
