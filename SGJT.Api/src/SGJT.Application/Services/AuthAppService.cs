using AutoMapper;
using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SGJT.Application.Interfaces;
using SGJT.Application.Settings;
using SGJT.Application.Validators;
using SGJT.Application.Validators.User;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace SGJT.Application.Services
{
    public class AuthAppService : IAuthAppService
    {
        private readonly RegisterUserValidator _registerUserValidator;
        private readonly IRepository<User> _userRepository;
        private readonly JWTSettings _jwtSettings;
        private readonly IMapper _mapper;

        public AuthAppService(RegisterUserValidator registerUserValidator, IRepository<User> userRepository, IOptions<JWTSettings> jwtSettings, IMapper mapper)
        {
            _registerUserValidator = registerUserValidator;
            _userRepository = userRepository;
            _jwtSettings = jwtSettings.Value;
            _mapper = mapper;
        }

        public IList<ValidationError> Register(RegisterUserViewModel registerUserViewModel)
        {
            ValidationResult validation = _registerUserValidator.Validate(registerUserViewModel);
            IList<ValidationError> validationErrors = validation.GetValidationResultErrors();

            if (validationErrors.Count > 0)
            {
                return validationErrors;
            }

            if (_userRepository.Get().FirstOrDefault(user => user.Name == registerUserViewModel.Name) != null)
            {
                validationErrors.Add(new ValidationError { PropertyName = "name", Errors = new List<string> { "Já existe um usuário cadastrado com esse nome." } });

                return validationErrors;
            }

            var user = _mapper.Map<User>(registerUserViewModel);

            _userRepository.Add(user);
            _userRepository.SaveChanges();

            return validationErrors;
        }

        public string Login(LoginUserViewModel loginUserViewModel)
        {
            var user = _userRepository.Get().FirstOrDefault(user => user.Name == loginUserViewModel.Name && user.Password == loginUserViewModel.Password);

            if (user == null)
            {
                return null;
            }

            var token = CreateJWT(user);

            return token;
        }

        private string CreateJWT(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                Expires = DateTime.UtcNow.AddHours(_jwtSettings.Expiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };

            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));
        }
    }
}