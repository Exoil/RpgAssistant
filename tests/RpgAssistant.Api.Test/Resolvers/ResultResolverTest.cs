using System.Net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using NSubstitute;
using RpgAssistant.Api.Resolvers;
using RpgAssistant.Application.Models;
using RpgAssistant.Domain.Exceptions;
using RpgAssistant.Domain.Exceptions.Models;

using Shouldly;

using Exception = System.Exception;

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
    public void ExecuteVoidRequest_Return_Expected_ObjectResult()
    {
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = httpResolver.GetResult(
            FooResultMethodVoid(),
            () => Results.Ok(),
            CancellationToken.None);

        result.ShouldNotBeNull();
        result.ShouldBeOfType<Ok>();
    }

    [Theory]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    [MemberData(nameof(GetExceptionsWithResponses))]
    public void ExecuteVoid_Request_Return_Over_400_HttpStatusCode(DomainException exception, int expectedStatusCode)
    {
        // assert
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result =  httpResolver.GetResult(
            FooResultMethodReturnExceptionVoid(exception),
            () => Results.Ok(),
            CancellationToken.None);

        result.ShouldBeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(exception.Message);
        problemHttpResult.ProblemDetails.Title.ShouldBe(exception.Title);
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public void ExecuteVoid_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        // assert
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result =  httpResolver.GetResult(
            FooResultMethodReturnExceptionVoid(new Exception("Test")),
            () => Results.Ok(),
            CancellationToken.None);

        result.ShouldBeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe((int)HttpStatusCode.InternalServerError);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}Test");
        problemHttpResult.ProblemDetails.Title.ShouldBe("Unexpected error");
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public void ExecuteIntRequest_Return_Expected_ObjectResult()
    {
        // acrt
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = httpResolver.GetResult(
            FooResultMethod(1),
            data => Results.Ok(data),
            CancellationToken.None);

        // assert
        result.ShouldNotBeNull();
        result.ShouldBeOfType<Ok<int>>();
    }

    [Theory]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    [MemberData(nameof(GetExceptionsWithResponses))]
    public void ExecuteInt_Request_Return_Over_400_HttpStatusCode(DomainException exception, int expectedStatusCode)
    {
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result = httpResolver.GetResult(
            FooResultMethodReturnException(exception),
            data => Results.Ok(data),
            CancellationToken.None);

        result.ShouldBeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe(expectedStatusCode);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(exception.Message);
        problemHttpResult.ProblemDetails.Title.ShouldBe(exception.Title);
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }

    [Fact]
    [Trait(Constants.TraitName,Constants.UnitTestTitle)]
    public void ExecuteInt_Request_Return_GeneralException_And_500_HttpStatusCode()
    {
        var httpResolver = new ResultResolver(_mockHttpContextAccessor);
        var result =  httpResolver.GetResult(
            FooResultMethodReturnException(new Exception("SomeException")),
            data => Results.Ok(data),
            CancellationToken.None);

        result.ShouldBeOfType<ProblemHttpResult>();
        var problemHttpResult = result as ProblemHttpResult;
        problemHttpResult!.StatusCode.ShouldBe((int)HttpStatusCode.InternalServerError);
        problemHttpResult.ProblemDetails.Detail.ShouldBe(
            $"Internal service exception, please contact with administrator.{Environment.NewLine}SomeException");
        problemHttpResult.ProblemDetails.Title.ShouldBe("Unexpected error");
        problemHttpResult.ProblemDetails.Instance.ShouldBe(_mockEndpoint.DisplayName);
    }


    public static IEnumerable<object[]> GetExceptionsWithResponses()
    {
        yield return new object[]
        {
            new ValidateException(
                "Text Validation Exception",
                "errorCode",
                new List<ValidationMessage>()),
            (int)HttpStatusCode.BadRequest
        };
        yield return new object[]
        {
            new DomainException("Test","errorCode", "Test Exception"),
            (int)HttpStatusCode.InternalServerError
        };
    }

    private Result<int, Exception> FooResultMethod(int value) => value;

    private Result<Exception> FooResultMethodVoid() => new();

    private Result<int, Exception> FooResultMethodReturnException(Exception exception) => exception;

    private Result<Exception> FooResultMethodReturnExceptionVoid(Exception exception) => exception;
}
