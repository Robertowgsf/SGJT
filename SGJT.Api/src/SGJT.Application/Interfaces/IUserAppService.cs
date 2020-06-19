using SGJT.Application.Validators;
using SGJT.Application.ViewModels;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface IUserAppService
    {
        IList<ValidationError> Add(UserViewModel obj);
        UserViewModel Get(long id);
        IEnumerable<UserViewModel> Get();
        IList<ValidationError> Update(UserViewModel obj);
        void Remove(long id);
    }
}
