using Microsoft.AspNetCore.Mvc;

namespace SGJT.Services.Api.Controllers
{
    public abstract class ApiController : ControllerBase
    {
        protected new IActionResult Response(object result = null)
        {
            return Ok(result);
        }

        protected new IActionResult Response(object result, int statusCode)
        {
            return StatusCode(statusCode, result);
        }
    }
}
