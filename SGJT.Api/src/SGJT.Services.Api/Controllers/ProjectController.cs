using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class ProjectController : CRUDController<ProjectViewModel>
    {
        public ProjectController(IProjectAppService projectAppService)
            : base(projectAppService)
        {
        }
    }
}
