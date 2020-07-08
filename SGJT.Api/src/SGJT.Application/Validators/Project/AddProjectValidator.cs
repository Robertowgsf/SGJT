using FluentValidation;
using SGJT.Application.ViewModels;

namespace SGJT.Application.Validators.Project
{
    public class AddProjectValidator : AbstractValidator<ProjectViewModel>
    {
        public AddProjectValidator()
        {
            ValidateName();
        }

        private void ValidateName()
        {
            RuleFor(project => project.Name)
                .NotEmpty().WithMessage("Digite um nome.")
                .MaximumLength(100).WithMessage("Tamanho máximo de nome é de 100 caracteres.");
        }
    }
}
