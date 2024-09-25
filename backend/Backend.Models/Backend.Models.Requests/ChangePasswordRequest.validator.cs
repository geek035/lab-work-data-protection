namespace Backend.models;

using System.Text.RegularExpressions;
using Backend.interfaces;
using FluentValidation;

public class ChangePasswordRequestValidator :
    AbstractValidator<ChangePasswordRequest>, 
    IChangePasswordRequestValidator<ChangePasswordRequest>
{
    public ChangePasswordRequestValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required");
    }

    public bool isSatisfactoryCondition(string password)
    {
        string pattern = @"^[\p{IsCyrillic}]+[a-zA-Z]+[0-9]+[\p{IsCyrillic}]+$";
        Regex regex = new Regex(pattern);
        
        return regex.IsMatch(password);
    }
}