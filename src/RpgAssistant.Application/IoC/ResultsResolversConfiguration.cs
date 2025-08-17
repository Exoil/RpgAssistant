using RpgAssistant.Application.ResultResolvers;

namespace RpgAssistant.Application.IoC;

public static class ResultsResolversConfiguration
{
    public static IServiceCollection RegisterResultsResolvers(this IServiceCollection services) =>
        services
            .AddHttpContextAccessor()
            .AddScoped<ResultsToHttpResponses>();
}
