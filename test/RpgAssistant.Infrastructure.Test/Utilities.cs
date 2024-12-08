using Neo4j.Driver;

namespace RpgAssistant.Infrastructure.Test;

public static class Utilities
{
    public static T GetRecordValue<T>(this IRecord record, string parameterName)
    {
        return record[parameterName].As<T>();
    }
}