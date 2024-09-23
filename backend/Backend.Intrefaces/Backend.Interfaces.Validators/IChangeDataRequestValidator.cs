using FluentValidation;

namespace Backend.interfaces;

public interface IChangeDataRequestValidator<T> : IValidator<T>
{
    public bool isSatisfactoryCondition(string password);
}