using AutoMapper;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators.User;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;

namespace SGJT.Application.Services
{
    public class UserAppService : CRUDAppService<UserViewModel, User, AddUserValidator>, IUserAppService
    {
        public UserAppService(IMapper mapper, IRepository<User> userRepository, AddUserValidator addUserValidator)
            : base(mapper, userRepository, addUserValidator)
        {
        }
    }
}
