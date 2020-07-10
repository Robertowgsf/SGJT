using FluentValidation;
using SGJT.Application.ViewModels;

namespace SGJT.Application.Validators.User
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserViewModel>
    {
        public RegisterUserValidator()
        {
            ValidateName();
            ValidateEmail();
            ValidateRole();
            ValidatePassword();
            ValidateConfirmPassword();
        }

        private void ValidateName()
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage("Digite um nome.")
                .MaximumLength(100).WithMessage("Tamanho máximo de nome é de 100 caracteres.")
                .MustNotContainsNumber().WithMessage("Tem certeza que digitou seu nome corretamente?");
        }

        private void ValidateEmail()
        {
            RuleFor(user => user.Email)
                .NotEmpty().WithMessage("Digite seu email.")
                .EmailAddress().WithMessage("Email inválido.");
        }

        private void ValidateRole()
        {
            RuleFor(user => user.Role)
                .NotEmpty().WithMessage("Cargo inválido.");
        }

        private void ValidatePassword()
        {
            RuleFor(user => user.Password)
                .NotEmpty().WithMessage("Digite sua senha.")
                .MinimumLength(8).WithMessage("Sua senha deve conter pelo menos 8 caracteres.")
                .Equal(user => user.ConfirmPassword).WithMessage("Senhas não conferem.");
        }

        private void ValidateConfirmPassword()
        {
            RuleFor(user => user.ConfirmPassword)
                .NotEmpty().WithMessage("Confirme sua senha.")
                .Equal(user => user.Password).WithMessage("Senhas não conferem.");
        }
    }
}
