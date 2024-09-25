namespace Backend.models;

using Backend.modelsl;
using FluentValidation;

public class ChangeDataRequestValidator : AbstractValidator<ChangeDataRequest>
{
    public ChangeDataRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required");
            
        RuleFor(x => x.IsAdminLocked)
            .Must(value => value == null || value is bool)
            .WithMessage("IsAdminLocked должно быть булевым значением, если указано.");

        RuleFor(x => x.IsPasswordRestricted)
            .Must(value => value == null || value is bool)
            .WithMessage("IsPasswordRestricted должно быть булевым значением, если указано.");
            
    }
}