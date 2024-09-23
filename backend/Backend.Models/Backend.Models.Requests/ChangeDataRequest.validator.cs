namespace Backend.models;

using System.Text.RegularExpressions;
using Backend.interfaces;
using Backend.modelsl;
using FluentValidation;

public class ChangeDataRequestValidator : AbstractValidator<ChangeDataRequest>, IChangeDataRequestValidator<ChangeDataRequest>
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

    public bool isSatisfactoryCondition(string password)
    {
        string pattern = @"^[\p{IsCyrillic}]+[a-zA-Z]+[0-9]+[\p{IsCyrillic}]+$";
        Regex regex = new Regex(pattern);
        
        return regex.IsMatch(password);
    }
}