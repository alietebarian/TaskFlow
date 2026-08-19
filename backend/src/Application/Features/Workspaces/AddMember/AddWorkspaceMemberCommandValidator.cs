using FluentValidation;

namespace Application.Features.Workspaces.AddMember;

public class AddWorkspaceMemberCommandValidator : AbstractValidator<AddWorkspaceMemberCommand>
{
    public AddWorkspaceMemberCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress();
    }
}
