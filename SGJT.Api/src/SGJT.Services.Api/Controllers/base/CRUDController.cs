using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;

namespace SGJT.Services.Api.Controllers
{
    public class CRUDController<TViewModel> : ApiController
        where TViewModel : class
    {
        private readonly ICRUDAppService<TViewModel> _CRUDAppService;

        public CRUDController(ICRUDAppService<TViewModel> CRUDAppService)
        {
            _CRUDAppService = CRUDAppService;
        }

        [Authorize(Roles = "Gerente")]
        [HttpPost]
        public IActionResult Add([FromBody]TViewModel viewModel)
        {
            var validationErrors = _CRUDAppService.Add(viewModel);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            return Response();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var viewModels = _CRUDAppService.Get();

            if (viewModels == null)
            {
                return Response(viewModels, 404);
            }

            return Response(viewModels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            var viewModels = _CRUDAppService.Get(id);

            return Response(viewModels);
        }

        [Authorize(Roles = "Gerente")]
        [HttpPut]
        public IActionResult Update([FromBody]TViewModel viewModel)
        {
            var validationErrors = _CRUDAppService.Update(viewModel);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            return Response();
        }

        [Authorize(Roles = "Gerente")]
        [HttpDelete("{id}")]
        public IActionResult Remove(long id)
        {
            _CRUDAppService.Remove(id);

            return Response();
        }
    }
}
