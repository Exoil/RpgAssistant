using RpgAssistant.Api.ResultResolvers;

namespace RpgAssistant.Api.IoC;

public static class ResultsResolversConfiguration
{
    public static IServiceCollection RegisterResultsResolvers(this IServiceCollection services) =>
        services
            .AddHttpContextAccessor()
            .AddScoped<ResultsToHttpResponses>();
}
