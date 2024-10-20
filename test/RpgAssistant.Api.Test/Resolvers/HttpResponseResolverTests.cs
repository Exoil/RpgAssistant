using System.Net;
using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;

namespace RpgAssistant.Api.Test.Resolvers;

public class HttpResponseResolverTests
{
    private readonly IHttpContextAccessor _mockHttpContextAccessor;
    private readonly Endpoint _mockEndpoint = new(null, null, "TestEndpoint");
    
    public HttpResponseResolverTests()
    {
        _mockHttpContextAccessor = Substitute.For<IHttpContextAccessor>();
        var mockHttpContext = Substitute.For<HttpContext>();
        mockHttpContext.GetEndpoint().Returns(_mockEndpoint);
        _mockHttpContextAccessor.HttpContext.Returns(mockHttpContext);
    }
    
    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteVoidRequest_Return_Expected_ObjectResult()
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestVoid>(), Arg.Any<CancellationToken>())
            .Returns(new Result<Exception>());
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestVoid(),
            () => Results.Ok(),
            CancellationToken.None);
        
        result.Should().NotBeNull();
        result.Should().BeOfType<Ok>();
    }

    [Theory]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    [MemberData(nameof(GetExceptionsWithResponses))]
    public async Task ExecuteVoid_Request_Return_Over_400_HttpStatusCode(DomainException exception, int expectedStatusCode)
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestVoid>(), Arg.Any<CancellationToken>())
            .Returns(exception);
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestVoid(),
            () => Results.Ok(),
            CancellationToken.None);
        
        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.Should().Be(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.Should().Be(exception.Message);
        problemHttpResult.ProblemDetails.Title.Should().Be(exception.Title);
        problemHttpResult.ProblemDetails.Instance.Should().Be(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteVoid_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestVoid>(), Arg.Any<CancellationToken>())
            .Returns(new Exception("test"));
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestVoid(),
            () => Results.Ok(),
            CancellationToken.None);
        
        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
        problemHttpResult.ProblemDetails.Detail.Should().Be(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}test");
        problemHttpResult.ProblemDetails.Title.Should().Be("Unexpected error");
        problemHttpResult.ProblemDetails.Instance.Should().Be(_mockEndpoint.DisplayName);
    }
    
    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteIntRequest_Return_Expected_ObjectResult()
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestInt>(), Arg.Any<CancellationToken>())
            .Returns(1);
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestInt(),
            data => Results.Ok(data),
            CancellationToken.None);
        
        result.Should().NotBeNull();
        result.Should().BeOfType<Ok<int>>();
    }

    [Theory]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    [MemberData(nameof(GetExceptionsWithResponses))]
    public async Task ExecuteInt_Request_Return_Over_400_HttpStatusCode(DomainException exception, int expectedStatusCode)
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestInt>(), Arg.Any<CancellationToken>())
            .Returns(exception);
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestInt(),
            data => Results.Ok(data),
            CancellationToken.None);
        
        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.Should().Be(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.Should().Be(exception.Message);
        problemHttpResult.ProblemDetails.Title.Should().Be(exception.Title);
        problemHttpResult.ProblemDetails.Instance.Should().Be(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteInt_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        var mockMediator = Substitute.For<IMediator>();
        mockMediator
            .Send(Arg.Any<FooRequestInt>(), Arg.Any<CancellationToken>())
            .Returns(new Exception("test"));
        
        var httpResolver = new HttpResponseResolver(mockMediator, _mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestInt(),
            data => Results.Ok(data),
            CancellationToken.None);
        
        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.Should().Be((int)HttpStatusCode.InternalServerError);
        problemHttpResult.ProblemDetails.Detail.Should().Be(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}test");
        problemHttpResult.ProblemDetails.Title.Should().Be("Unexpected error");
        problemHttpResult.ProblemDetails.Instance.Should().Be(_mockEndpoint.DisplayName);
    }
    
    
    public static IEnumerable<object[]> GetExceptionsWithResponses()
    {
        yield return new object[]
        {
            new ValidationException("Text Validation Exception", new List<ValidationMessage>()),
            (int)HttpStatusCode.BadRequest
        };
        yield return new object[]
        {
            new BusinessValidationException("Test", "Test Exception"),
            (int)HttpStatusCode.UnprocessableEntity
        };
        yield return new object[]
        {
            new NotFoundException("Test", "Test Exception Source"),
            (int)HttpStatusCode.NotFound
        };
        yield return new object[]
        {
            new DomainException("Test", "Test Exception"),
            (int)HttpStatusCode.InternalServerError
        };
    }
}

internal record FooRequestVoid : IRequest<Result<Exception>>;

internal record FooRequestInt : IRequest<Result<int, Exception>>;