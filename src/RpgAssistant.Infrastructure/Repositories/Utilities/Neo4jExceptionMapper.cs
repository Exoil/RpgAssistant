using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Infrastructure.Repositories.Utilities;

public static class Neo4jExceptionMapper
{
    public static DomainException MapToDomainException(Exception ex) =>
        ex switch
        {
            Neo4j.Driver.ServiceUnavailableException serviceEx => new DomainException(
                "Database Service Unavailable",
                "DB_SERVICE_UNAVAILABLE",
                $"The database service is currently unavailable: {serviceEx.Message}"),

            Neo4j.Driver.ClientException clientEx => new DomainException(
                "Database Client Error",
                "DB_CLIENT_ERROR",
                $"An error occurred while communicating with the database: {clientEx.Message}"),

            Neo4j.Driver.TransientException transientEx => new DomainException(
                "Transient Database Error",
                "DB_TRANSIENT_ERROR",
                $"A transient error occurred in the database. Please retry the operation: {transientEx.Message}"),

            Neo4j.Driver.DatabaseException dbEx => new DomainException(
                "Database Error",
                "DB_DATABASE_ERROR",
                $"A database error occurred: {dbEx.Message}"),

            Neo4j.Driver.AuthenticationException authEx => new DomainException(
                "Database Authentication Error",
                "DB_AUTH_ERROR",
                $"Failed to authenticate with the database: {authEx.Message}"),

            Neo4j.Driver.ProtocolException protocolEx => new DomainException(
                "Database Protocol Error",
                "DB_PROTOCOL_ERROR",
                $"A database protocol error occurred: {protocolEx.Message}"),

            // Add a general case for any Neo4j exception that derives from Exception
            Exception neoEx when neoEx.GetType().Namespace?.StartsWith("Neo4j.Driver") == true => new DomainException(
                "Database Error",
                "DB_GENERAL_ERROR",
                $"An error occurred with the database: {neoEx.Message}"),

            _ => throw ex // Re-throw exceptions that aren't Neo4j driver exceptions
        };
}
