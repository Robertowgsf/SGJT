using SGJT.Application.Validators;
using SGJT.Application.ViewModels;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface IAuthAppService
    {
        IList<ValidationError> Register(RegisterUserViewModel registerUserViewModel);
        string Login(LoginUserViewModel loginUserViewModel);
    }
}
