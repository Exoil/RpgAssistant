using MessagePipe;

using Microsoft.Extensions.DependencyInjection;

using Loreweave.Application.Commands;
using Loreweave.Application.Commands.CommandHandlers;
using Loreweave.Application.Filters;
using Loreweave.Application.Models;
using Loreweave.Application.Queries;
using Loreweave.Application.Queries.QueryHandlers;

namespace Loreweave.Application.IoC;

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
