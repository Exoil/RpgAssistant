using MessagePipe;
using RpgAssistant.Application.CQRS.Commands;
using RpgAssistant.Application.CQRS.Commands.CommandHandlers;
using RpgAssistant.Application.CQRS.Queries;
using RpgAssistant.Application.CQRS.Queries.QueryHandlers;
using RpgAssistant.Application.Dtos;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Application.IoC;

public static class HandlerConfiguration
{
    public static IServiceCollection RegisterHandlers(this IServiceCollection services)
    {
        services.AddMessagePipe(options =>
        {
            options.InstanceLifetime = InstanceLifetime.Scoped;
            options.RequestHandlerLifetime = InstanceLifetime.Scoped;
        });

        return services
            .AddScoped<IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>, CreateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>, UpdateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>, DeleteCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<GetCharacterByIdQuery, Result<CharacterPayload, Exception>>, GetCharacterByIdQueryHandler>();
    }
}
