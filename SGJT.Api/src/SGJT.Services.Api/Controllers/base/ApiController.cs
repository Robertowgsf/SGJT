using Microsoft.AspNetCore.Mvc;

namespace SGJT.Services.Api.Controllers
{
    public abstract class ApiController : ControllerBase
    {
        protected new IActionResult Response(object result = null, bool success = true)
        {
            var response = new
            {
                success,
                data = result
            };

            if (success)
            {
                return Ok(response);
            }
            else
            {
                return BadRequest(response);
            }
        }

        protected new IActionResult Response(object result, bool success, int statusCode)
        {
            var response = new
            {
                success,
                data = result
            };

            return StatusCode(statusCode, response);
        }
    }
}
