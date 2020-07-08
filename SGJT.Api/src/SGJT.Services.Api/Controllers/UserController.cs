using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : CRUDController<UserViewModel>
    {
        public UserController(IUserAppService userAppService)
            : base(userAppService)
        {
        }
    }
}
