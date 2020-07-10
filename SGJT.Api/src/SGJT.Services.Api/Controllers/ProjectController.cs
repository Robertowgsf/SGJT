using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectController : CRUDController<ProjectViewModel, Project>
    {
        private readonly IProjectAppService _projectAppService;
        public ProjectController(IProjectAppService projectAppService)
            : base(projectAppService)
        {
            _projectAppService = projectAppService;
        }

        [HttpPost("addAssociation")]
        public IActionResult AddAssociation([FromBody]AddAssociationViewModel addAssociationViewModel)
        {
            var projectViewModel = _projectAppService.AddAssociation(addAssociationViewModel);

            return Response(projectViewModel);
        }

        [HttpPost("removeAssociation")]
        public IActionResult RemoveAssociation([FromBody]RemoveAssociationViewModel removeAssociationViewModel)
        {
            _projectAppService.RemoveAssociation(removeAssociationViewModel);

            return Response();
        }
    }
}
