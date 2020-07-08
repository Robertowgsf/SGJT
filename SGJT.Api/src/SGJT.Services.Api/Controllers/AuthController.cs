using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators;
using SGJT.Application.ViewModels;
using System.Collections.Generic;

namespace SGJT.Services.Api.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ApiController
    {
        private readonly IAuthAppService _authAppService;

        public AuthController(IAuthAppService authAppService)
        {
            _authAppService = authAppService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterUserViewModel registerUserViewModel)
        {
            var validationErrors = _authAppService.Register(registerUserViewModel);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            return Response();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginUserViewModel loginUserViewModel)
        {
            var token = _authAppService.Login(loginUserViewModel);

            if (token == null)
            {
                return Response(new List<ValidationError> { new ValidationError { PropertyName = "name", Errors = new List<string> { "Usuário ou senha inválidos" } } }, 401);
            }

            var result = new { token };

            return Response(result);
        }
    }
}
