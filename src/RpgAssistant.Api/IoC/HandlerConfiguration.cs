using MessagePipe;

using RpgAssistant.Api.CQRS.Commands;
using RpgAssistant.Api.CQRS.Commands.CommandHandlers;
using RpgAssistant.Api.CQRS.Queries;
using RpgAssistant.Api.CQRS.Queries.QueryHandlers;
using RpgAssistant.Api.Dtos;
using RpgAssistant.Domain.Models;

namespace RpgAssistant.Api.IoC;

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
            .AddScoped<IAsyncRequestHandler<CreateCharacterCommand, Result<Ulid, Exception>>,
                CreateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<UpdateCharacterCommand, Result<Exception>>, UpdateCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<DeleteCharacterCommand, Result<Exception>>, DeleteCharacterCommandHandler>()
            .AddScoped<IAsyncRequestHandler<GetCharacterByIdQuery, Result<CharacterPayload, Exception>>,
                GetCharacterByIdQueryHandler>()
            .AddScoped<IAsyncRequestHandler<GetCharacterPageQuery, Result<IReadOnlyCollection<CharacterPayload>, Exception>>,
                GetCharacterPageQueryHandler>()
            .AddScoped<IAsyncRequestHandler<CreateKnowRelationCommand, Result<Ulid, Exception>>,
                CreateKnowRelationCommandHandler>()
            .AddScoped<IAsyncRequestHandler<DeleteKnowRelationCommand, Result<Exception>>,
                DeleteKnowRelationCommandHandler>();
    }
}
