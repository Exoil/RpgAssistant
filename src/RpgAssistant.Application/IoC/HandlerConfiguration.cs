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
        var messagePipeBuilder = services
            .AddMessagePipe(options =>
            {
                options.InstanceLifetime = InstanceLifetime.Scoped;
                options.RequestHandlerLifetime = InstanceLifetime.Scoped;
                options.AddGlobalAsyncRequestHandlerFilter(typeof(LogFilter<,>), 0);
            })
            .AddAsyncRequestHandler<CreateCharacterCommandHandler>()
            .AddAsyncRequestHandler<UpdateCharacterCommandHandler>()
            .AddAsyncRequestHandler<DeleteCharacterCommandHandler>()
            .AddAsyncRequestHandler<GetCharacterByIdQueryHandler>()
            .AddAsyncRequestHandler<GetCharacterPageQueryHandler>()
            .AddAsyncRequestHandler<CreateKnowRelationCommandHandler>()
            .AddAsyncRequestHandler<DeleteKnowRelationCommandHandler>()
            .AddAsyncRequestHandler<FindRelationBetweenCharacterQueryHandler>();

        return services;
    }
}
