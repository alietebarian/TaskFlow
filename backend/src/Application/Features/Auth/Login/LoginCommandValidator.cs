using FluentValidation;

namespace Application.Features.Auth.Login;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email must not be empty")
            .EmailAddress();

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password must not be empty");
    }
}
