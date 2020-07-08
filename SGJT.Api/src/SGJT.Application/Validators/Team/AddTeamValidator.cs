using FluentValidation;
using SGJT.Application.ViewModels;

namespace SGJT.Application.Validators.Team
{
    public class AddTeamValidator : AbstractValidator<TeamViewModel>
    {
        public AddTeamValidator()
        {
            ValidateName();
        }

        private void ValidateName()
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage("Digite um nome.")
                .MaximumLength(100).WithMessage("Tamanho máximo de nome é de 100 caracteres.");
        }
    }
}
