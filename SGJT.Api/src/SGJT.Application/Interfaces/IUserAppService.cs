using SGJT.Application.ViewModels;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface IUserAppService
    {
        void Add(UserViewModel obj);
        UserViewModel Get(long id);
        IEnumerable<UserViewModel> Get();
        void Update(UserViewModel obj);
        void Remove(long id);
    }
}
