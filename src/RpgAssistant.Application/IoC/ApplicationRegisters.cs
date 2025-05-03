using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using RpgAssistant.Infrastructure.IoC;

namespace RpgAssistant.Application.IoC;

public static class ApplicationRegisters
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services,
        IConfiguration configuration) =>
            services
                .AddInfrastructure(configuration);

    public static IHealthChecksBuilder AddApplicationHealthChecks(
        this IHealthChecksBuilder builder) =>
            builder
                .AddInfrastructureHealthChecks();
}
