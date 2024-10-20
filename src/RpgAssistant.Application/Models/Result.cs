namespace RpgAssistant.Application.Models;

public readonly struct Result<TError>
    where TError : Exception
{
    public readonly TError? Error;
    private readonly bool _isError;
    public bool IsSuccess => !_isError;

    private Result(TError? error)
    {
        Error = error;
        _isError = error is not null;
    }
    
    public static implicit operator Result<TError>(TError error)
        => new(error);
}

public readonly struct Result<TValue, TError>
    where TError : Exception
{
    private readonly TValue? _value;

    public TValue Value
    {
        get
        {
            if (_isError)
                throw Error!;

            return _value!;
        }
    }
    public readonly TError? Error;
    private readonly bool _isError;
    public bool IsSuccess => !_isError;

    private Result(TValue value)
    {
        _isError = false;
        _value = value;
        Error = default;
    }

    private Result(TError? error)
    {
        _isError = true;
        _value = default;
        Error = error;
    }

    public static implicit operator Result<TValue, TError>(TValue value)
        => new(value);
    public static implicit operator Result<TValue, TError>(TError error)
        => new(error);
}