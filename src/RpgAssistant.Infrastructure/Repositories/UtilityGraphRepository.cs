using Microsoft.Extensions.Diagnostics.HealthChecks;

using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Repositories;

public class UtilityGraphRepository : BaseGraphRepository
{
    public UtilityGraphRepository(IDriver driver) : base(driver)
    {

    }

    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            // Try opening a session and running a simple query
            var result = await _session.RunAsync("RETURN 1");
            await result.ConsumeAsync(); // Force query execution

            return HealthCheckResult.Healthy("Neo4j is available.");
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Neo4j is unavailable.", ex);
        }
    }
}
