using System;
using MediatR;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Application.Models;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Handlers.CommandHandlers;

public class CreateKnowledgeCharacterCommandHandler
    : IRequestHandler<CreateKnowledgeCharacterCommand, Result<Exception>>
{
    private readonly ICharacterRepository _characterRepository;

    public CreateKnowledgeCharacterCommandHandler(ICharacterRepository characterRepository)
    {
        _characterRepository = characterRepository;
    }

    public Task<Result<Exception>> Handle(
        CreateKnowledgeCharacterCommand request,
        CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}
