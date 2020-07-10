using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : CRUDController<UserViewModel, User>
    {
        private readonly IUserAppService _userAppService;
        public UserController(IUserAppService userAppService)
            : base(userAppService)
        {
            _userAppService = userAppService;
        }

        [HttpPost("addAssociation")]
        public IActionResult AddAssociation([FromBody]AddAssociationViewModel addAssociationViewModel)
        {
            var userViewModel = _userAppService.AddAssociation(addAssociationViewModel);

            return Response(userViewModel);
        }

        [HttpPost("removeAssociation")]
        public IActionResult RemoveAssociation([FromBody]RemoveAssociationViewModel removeAssociationViewModel)
        {
            _userAppService.RemoveAssociation(removeAssociationViewModel);

            return Response();
        }
    }
}
