namespace Backend.models;
using FluentValidation;

public class UserDTOValidator : AbstractValidator<UserDTO>
{
    public UserDTOValidator()
    {
        RuleFor(x => x.username)
            .NotEmpty().WithMessage("Username is required");
    }
}