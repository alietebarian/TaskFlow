using FluentValidation;

namespace Application.Features.Tasks.Create;

public class CreateTaskCommandValidator : AbstractValidator<CreateTaskCommand>
{
    public CreateTaskCommandValidator()
    {
        RuleFor(x => x.Priority)
            .IsInEnum();

        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);
    }
}

