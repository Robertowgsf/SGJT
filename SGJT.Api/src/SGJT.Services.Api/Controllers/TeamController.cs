using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class TeamController : CRUDController<TeamViewModel>
    {
        private readonly ITeamAppService _teamAppService;

        public TeamController(ITeamAppService teamAppService)
            : base(teamAppService)
        {
            _teamAppService = teamAppService;
        }

        [HttpPut("removerAssociacao")]
        public IActionResult RemoverAssociacao([FromBody]TeamViewModel teamViewModel)
        {
            _teamAppService.RemoverAssociacao(teamViewModel);

            return Response();
        }
    }
}