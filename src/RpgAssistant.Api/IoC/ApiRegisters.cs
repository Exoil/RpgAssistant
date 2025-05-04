using RpgAssistant.Application.IoC;

namespace RpgAssistant.Api.IoC;

public static class ApiRegisters
{
    static internal IServiceCollection AddApi(
        this IServiceCollection services,
        IConfiguration configuration) =>
            services.AddApplication(configuration);


    static internal IHealthChecksBuilder AddApiHealthChecks(
        this IHealthChecksBuilder builder) =>
            builder.AddApplicationHealthChecks();
}
