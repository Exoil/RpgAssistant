using Microsoft.Extensions.Diagnostics.HealthChecks;

using Neo4j.Driver;

using RpgAssistant.Infrastructure.Repositories;

namespace RpgAssistant.Infrastructure.IoC.HealthChecks;

public class GraphDbHealthCheck : IHealthCheck
{
    private readonly UtilityGraphRepository _utilityGraphRepository;

    public GraphDbHealthCheck(UtilityGraphRepository utilityGraphRepository)
    {
        _utilityGraphRepository = utilityGraphRepository;
    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default) =>
        await _utilityGraphRepository.CheckHealthAsync(context, cancellationToken);
}
