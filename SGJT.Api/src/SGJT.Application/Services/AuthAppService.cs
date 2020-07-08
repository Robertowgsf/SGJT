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
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RegisterUserValidator _registerUserValidator;
        private readonly IRepository<User> _userRepository;
        private readonly JWTSettings _jwtSettings;
        private readonly IMapper _mapper;

        public AuthAppService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RegisterUserValidator registerUserValidator, IRepository<User> userRepository, IOptions<JWTSettings> jwtSettings, IMapper mapper)
        {
            _userManager = userManager;
            _signInManager = signInManager;
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

            //var user = new IdentityUser
            //{
            //    UserName = registerUserViewModel.Name,
            //    Email = registerUserViewModel.Email,
            //    EmailConfirmed = true,

            //};

            //var creationResult = await _userManager.CreateAsync(user, registerUserViewModel.Password);

            //if (creationResult.Errors.Count() > 0)
            //{
            //    return new List<ValidationError>() { new ValidationError { PropertyName = "Erro" } };
            //}

            //await _userManager.AddClaimAsync(user, new Claim(registerUserViewModel.Type, registerUserViewModel.Type));

            //var applicationUser = new ApplicationUser
            //{
            //    IdentityUser = user
            //};

            var user = _mapper.Map<User>(registerUserViewModel);

            _userRepository.Add(user);
            _userRepository.SaveChanges();

            return validationErrors;
        }

        public string Login(LoginUserViewModel loginUserViewModel)
        {
            var user = _userRepository.Get().FirstOrDefault(user => user.Name == loginUserViewModel.Name && user.Password == loginUserViewModel.Password);

            //var result = await _signInManager.PasswordSignInAsync(loginUserViewModel.Name, loginUserViewModel.Password, false, true);

            //if (!result.Succeeded)
            //{
            //    return null;
            //}

            if (user == null)
            {
                return null;
            }

            var token = CreateJWT(user);

            return token;
        }

        private string CreateJWT(User user)
        {
            //var user = await _userManager.FindByNameAsync(userName);
            //var identityClaims = new ClaimsIdentity();
            //identityClaims.AddClaims(await _userManager.GetClaimsAsync(user));
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