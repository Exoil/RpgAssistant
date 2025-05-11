using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using RpgAssistant.Application.Services;
using RpgAssistant.Application.Services.Interfaces;
using RpgAssistant.Infrastructure.IoC;

namespace RpgAssistant.Application.IoC;

public static class ApplicationRegisters
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services,
        IConfiguration configuration) =>
            services
                .AddInfrastructure(configuration)
                .RegisterServices();

    public static IHealthChecksBuilder AddApplicationHealthChecks(
        this IHealthChecksBuilder builder) =>
            builder
                .AddInfrastructureHealthChecks();

    private static IServiceCollection RegisterServices(this IServiceCollection services) =>
        services
            .AddScoped<ICharacterService, CharacterService>();
}
