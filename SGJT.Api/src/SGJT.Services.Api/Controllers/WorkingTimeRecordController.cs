using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;

namespace SGJT.Services.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class WorkingTimeRecordController : ApiController
    {
        private readonly IWorkingTimeRecordAppService _workingTimeRecordAppService;

        public WorkingTimeRecordController(IWorkingTimeRecordAppService workingTimeRecordAppService)
        {
            _workingTimeRecordAppService = workingTimeRecordAppService;
        }

        [HttpPost("registerWorkingTimeRecord")]
        public IActionResult RegisterWorkingTimeRecord([FromBody]AddWorkingTimeRecordViewModel addWorkingTimeRecordViewModel)
        {
            _workingTimeRecordAppService.RegisterWorkingTimeRecord(addWorkingTimeRecordViewModel);

            return Response();
        }

        [HttpGet("getByUsername/{name}")]
        public IActionResult Get(string name)
        {
            var workingTimeRecords = _workingTimeRecordAppService.GetByUsername(name);

            return Response(workingTimeRecords);
        }

        [Authorize(Roles = "Gestor")]
        [HttpGet]
        public IActionResult Get()
        {
            var workingTimeRecords = _workingTimeRecordAppService.Get();

            return Response(workingTimeRecords);
        }
    }
}
