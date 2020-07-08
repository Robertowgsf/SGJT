using FluentValidation;
using SGJT.Application.ViewModels;

namespace SGJT.Application.Validators.User
{
    public class AddUserValidator : AbstractValidator<UserViewModel>
    {
        public AddUserValidator()
        {
            ValidateName();
            //ValidateDailyHours();
        }

        private void ValidateName()
        {
            RuleFor(user => user.Name)
                .NotEmpty().WithMessage("Digite um nome.")
                .MaximumLength(100).WithMessage("Tamanho máximo de nome é de 100 caracteres.")
                .MustNotContainsNumber().WithMessage("Tem certeza que digitou seu nome corretamente?");
        }

        //private void ValidateDailyHours()
        //{
        //    RuleFor(user => user.DailyHours)
        //        .NotNull().WithMessage("Digite a quantidade de horas diárias.")
        //        .GreaterThan(0).WithMessage("Quantidade de horas diárias inválida.");
        //}
    }
}
