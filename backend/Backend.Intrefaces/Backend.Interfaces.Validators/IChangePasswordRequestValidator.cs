using FluentValidation;

namespace Backend.interfaces;

public interface IChangePasswordRequestValidator<T> : IValidator<T>
{
    public bool isSatisfactoryCondition(string password);
}