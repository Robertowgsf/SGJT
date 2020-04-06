using AutoMapper;
using AutoMapper.QueryableExtensions;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System.Collections.Generic;

namespace SGJT.Application.Services
{
    public class UserAppService : IUserAppService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<User> _userRepository;

        public UserAppService(IMapper mapper, IRepository<User> userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        public void Add(UserViewModel obj)
        {
            var user = _mapper.Map<User>(obj);

            _userRepository.Add(user);
            _userRepository.SaveChanges();
        }

        public UserViewModel Get(long id)
        {
            var user = _userRepository.Get(id);
            var userViewModel = _mapper.Map<UserViewModel>(user);

            return userViewModel;
        }

        public IEnumerable<UserViewModel> Get()
        {
            var users = _userRepository.Get();
            var usersViewModel = users.ProjectTo<UserViewModel>(_mapper.ConfigurationProvider);

            return usersViewModel;
        }

        public void Update(UserViewModel obj)
        {
            var user = _mapper.Map<User>(obj);

            _userRepository.Update(user);
            _userRepository.SaveChanges();
        }

        public void Remove(long id)
        {
            _userRepository.Remove(id);
            _userRepository.SaveChanges();
        }
    }
}
