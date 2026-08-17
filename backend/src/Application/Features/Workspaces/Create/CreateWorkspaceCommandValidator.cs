using FluentValidation;

namespace Application.Features.Workspaces.Create;

public class CreateWorkspaceCommandValidator : AbstractValidator<CreateWorkspaceCommand>
{
    public CreateWorkspaceCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name must not be empty")
            .MaximumLength(100);
    }
}
