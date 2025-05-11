using Microsoft.AspNetCore.Mvc;
using RpgAssistant.Domain.Exceptions;
using System.Text.Json;

using ILogger = Serilog.ILogger;

namespace RpgAssistant.API.Middleware;

public class ValidationExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public ValidationExceptionMiddleware(RequestDelegate next, ILogger logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidateException ex)
        {
            _logger.Warning(ex, "Validation error occurred");

            context.Response.StatusCode = StatusCodes.Status400BadRequest;
            context.Response.ContentType = "application/problem+json";

            var problemDetails = new ProblemDetails
            {
                Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                Title = ex.Title,
                Status = StatusCodes.Status400BadRequest,
                Detail = ex.Message
            };

            // Add non-standard properties to the ProblemDetails
            problemDetails.Extensions["errors"] = ex.ValidationErrors;
            problemDetails.Extensions["errorCode"] = ex.ErrorCode;

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            var json = JsonSerializer.Serialize(problemDetails, options);
            await context.Response.WriteAsync(json);
        }
    }
}
