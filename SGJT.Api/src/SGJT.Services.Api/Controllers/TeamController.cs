using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TeamController : CRUDController<TeamViewModel, Team>
    {
        private readonly ITeamAppService _teamAppService;

        public TeamController(ITeamAppService teamAppService)
            : base(teamAppService)
        {
            _teamAppService = teamAppService;
        }

        [HttpPost("addAssociation")]
        public IActionResult AddAssociation([FromBody]AddAssociationViewModel addAssociationViewModel)
        {
            var userViewModel = _teamAppService.AddAssociation(addAssociationViewModel);

            return Response(userViewModel);
        }

        [HttpPost("removeAssociation")]
        public IActionResult RemoveAssociation([FromBody]RemoveAssociationViewModel removeAssociationViewModel)
        {
            _teamAppService.RemoveAssociation(removeAssociationViewModel);

            return Response();
        }
    }
}