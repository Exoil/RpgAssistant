using System.ComponentModel.DataAnnotations;
using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Domain.Exceptions;

using Shouldly;

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
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
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
        // assert
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestVoid(),
            () => Results.Ok(),
            CancellationToken.None);

        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(exception.Message);
        problemHttpResult.ProblemDetails.Title.ShouldBe(exception.Title);
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteVoid_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        // assert
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestVoid(),
            () => Results.Ok(),
            CancellationToken.None);

        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe((int)HttpStatusCode.InternalServerError);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}test");
        problemHttpResult.ProblemDetails.Title.ShouldBe("Unexpected error");
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteIntRequest_Return_Expected_ObjectResult()
    {
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
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
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = await httpResolver.GetResult(
            new FooRequestInt(),
            data => Results.Ok(data),
            CancellationToken.None);

        result.Should().BeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(exception.Message);
        problemHttpResult.ProblemDetails.Title.ShouldBe(exception.Title);
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public async Task ExecuteInt_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
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
            new ValidationException("Text Validation Exception", "errorCode",new List<ValidateException>()),
            (int)HttpStatusCode.BadRequest
        };
        yield return new object[]
        {
            new DomainException("Test","errorCode", "Test Exception"),
            (int)HttpStatusCode.InternalServerError
        };
    }
}
