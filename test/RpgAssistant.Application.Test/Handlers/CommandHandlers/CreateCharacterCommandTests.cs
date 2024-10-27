using FluentAssertions;
using NSubstitute;
using NSubstitute.ExceptionExtensions;
using RpgAssistant.Application.Handlers.CommandHandlers;
using RpgAssistant.Application.Handlers.CommandHandlers.Commands;
using RpgAssistant.Domain.Constants;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Infrastructure.IRepositories;

namespace RpgAssistant.Application.Test.Handlers.CommandHandlers;

public class CreateCharacterCommandTests
{
    public class CreateCharacterCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ValidCommand_ReturnsUlid()
        {
            // Arrange
            var id = Ulid.NewUlid();
            var characterRepository = Substitute.For<ICharacterRepository>();
            var command = new CreateCharacterCommand("John", "Desc");
            characterRepository
                .CreateAsync(Arg.Any<CreateCharacterCommand>(), Arg.Any<CancellationToken>())
                .Returns(id);

            var handler = new CreateCharacterCommandHandler(characterRepository);

            // Act
            var ulidReturned = await handler.Handle(command, default);

            // Assert
            ulidReturned.Value.Should().Be(id);
        }

        [Fact]
        public async Task Handle_RepositoryThrowsException_ErrorIsPropagated()
        {
            // Arrange
            var characterRepository = Substitute.For<ICharacterRepository>();
            characterRepository.CreateAsync(Arg.Any<CreateCharacterCommand>(), Arg.Any<CancellationToken>())
                .ThrowsAsync(_ => throw new Exception());

            var handler = new CreateCharacterCommandHandler(characterRepository);

            // Act
            var result = await handler.Handle(new CreateCharacterCommand("John", "Desc"), CancellationToken.None);

            // Assert
            result.Error.Should().BeOfType<DomainException>();
        }
    }
    
    [Fact]
    public void CreateCharacterCommand_InvalidName_TooLongName_ThrowsValidationError()
    {
        string tooLongName = new string('*', CharacterConstants.MaxNameLength+1); // Name > 50 characters

        // Arrange & Act
        var action = () => new CreateCharacterCommand(tooLongName, "Valid Description");
            
        // Assert
        action.Should().ThrowExactly<Domain.Exceptions.ValidationException>();
    }

    [Fact]
    public void CreateCharacterCommand_InvalidDescription_TooLongDescription_ThrowsValidationError()
    {
        string tooLongDescription = new string('*', CharacterConstants.MaxDescriptionLength + 1); // Description > 255 characters

        // Arrange & Act
        var action = () => new CreateCharacterCommand("Valid Name", tooLongDescription);

        // Assert
        action.Should().ThrowExactly<Domain.Exceptions.ValidationException>();
    }
    
    [Fact]
    public void CreateCharacterCommand_InvalidNameLessThanOneChar_ThrowsValidationError()
    {
        string lessThanOneChar = string.Empty; // Name < 1 character

        // Arrange & Act
        Action action = () =>
        {
            _ = new CreateCharacterCommand(lessThanOneChar, "Valid Description");
        };

        // Assert
        action.Should().ThrowExactly<Domain.Exceptions.ValidationException>();
    }
}