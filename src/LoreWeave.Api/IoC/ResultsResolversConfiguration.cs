using LoreWeave.Api.ResultResolvers;

namespace LoreWeave.Api.IoC;

public static class ResultsResolversConfiguration
{
    public static IServiceCollection RegisterResultsResolvers(this IServiceCollection services) =>
        services
            .AddHttpContextAccessor()
            .AddScoped<ResultsToHttpResponses>();
}
