using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;

namespace SGJT.Services.Api.Controllers
{
    [Route("api/[controller]")]
    public class UserController : ApiController
    {
        private readonly IUserAppService _userAppService;

        public UserController(IUserAppService userAppService)
        {
            _userAppService = userAppService;
        }

        [HttpPost]
        public IActionResult Add([FromBody]UserViewModel obj)
        {
            var validationErrors = _userAppService.Add(obj);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            return Response();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var objects = _userAppService.Get();

            return Response(objects);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var obj = _userAppService.Get(id);

            if (obj == null)
            {
                return Response(obj, 404);
            }

            return Response(obj);
        }

        [HttpPut]
        public IActionResult Update([FromBody]UserViewModel obj)
        {
            var validationErrors = _userAppService.Update(obj);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            return Response();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(long id)
        {
            _userAppService.Remove(id);

            return Response();
        }
    }
}
