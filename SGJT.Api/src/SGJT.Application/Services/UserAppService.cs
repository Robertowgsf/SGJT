using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation.Results;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators;
using SGJT.Application.Validators.User;
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
        private readonly AddUserValidator _addUserValidator;

        public UserAppService(IMapper mapper, IRepository<User> userRepository, AddUserValidator addUserValidator)
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _addUserValidator = addUserValidator;
        }

        public IList<ValidationError> Add(UserViewModel obj)
        {
            ValidationResult validation = _addUserValidator.Validate(obj);

            if (validation.IsValid)
            {
                var user = _mapper.Map<User>(obj);

                _userRepository.Add(user);
                _userRepository.SaveChanges();
            }

            return validation.GetValidationResultErrors();
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

        public IList<ValidationError> Update(UserViewModel obj)
        {
            ValidationResult validation = _addUserValidator.Validate(obj);

            if (validation.IsValid)
            {
                var user = _mapper.Map<User>(obj);

                _userRepository.Update(user);
                _userRepository.SaveChanges();
            }

            return validation.GetValidationResultErrors();
        }

        public void Remove(long id)
        {
            _userRepository.Remove(id);
            _userRepository.SaveChanges();
        }
    }
}
