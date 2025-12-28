using MessagePipe;

using Microsoft.Extensions.DependencyInjection;

using RpgAssistant.Application.Commands;
using RpgAssistant.Application.Commands.CommandHandlers;
using RpgAssistant.Application.Filters;
using RpgAssistant.Application.Models;
using RpgAssistant.Application.Queries;
using RpgAssistant.Application.Queries.QueryHandlers;

namespace RpgAssistant.Application.IoC;

public static class HandlerConfiguration
{
    public static IServiceCollection RegisterHandlers(this IServiceCollection services)
    {
        services.AddMessagePipe(options =>
        {
            options.InstanceLifetime = InstanceLifetime.Scoped;
            options.RequestHandlerLifetime = InstanceLifetime.Scoped;
            options.AddGlobalAsyncMessageHandlerFilter(typeof(LogFilter<>), order: 0);
        });

        return services
            .AddScoped<IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>,
                CreateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>, UpdateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>, DeleteCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<GetCharacterByIdQuery, Result<CharacterPayload, Exception>>,
                GetCharacterByIdQueryHandler>()
            .AddScoped<IAsyncRequestHandler<GetCharacterPageQuery,
                    Result<IReadOnlyCollection<CharacterPayload>, Exception>>,
                GetCharacterPageQueryHandler>()
            .AddScoped<IAsyncRequestHandler<CreateKnowRelationCommand, Result<Ulid, Exception>>,
                CreateKnowRelationCommandHandler>()
            .AddScoped<IAsyncRequestHandler<DeleteKnowRelationCommand, Result<Exception>>,
                DeleteKnowRelationCommandHandler>();
    }
}
