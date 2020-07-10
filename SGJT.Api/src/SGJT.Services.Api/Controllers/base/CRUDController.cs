using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGJT.Application.Interfaces;
using SGJT.Domain.Entities;

namespace SGJT.Services.Api.Controllers
{
    public class CRUDController<TViewModel, TEntity> : ApiController
        where TViewModel : class
        where TEntity : Entity
    {
        private readonly ICRUDAppService<TViewModel, TEntity> _CRUDAppService;

        public CRUDController(ICRUDAppService<TViewModel, TEntity> CRUDAppService)
        {
            _CRUDAppService = CRUDAppService;
        }

        [Authorize(Roles = "Gestor")]
        [HttpPost]
        public IActionResult Add([FromBody]TViewModel viewModel)
        {
            var validationErrors = _CRUDAppService.ValidateAddViewModel(viewModel);

            if (validationErrors.Count > 0)
            {
                return Response(validationErrors, 400);
            }

            var entity = _CRUDAppService.Add(viewModel);

            return Response(entity);
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

        [Authorize(Roles = "Gestor")]
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

        [Authorize(Roles = "Gestor")]
        [HttpDelete("{id}")]
        public IActionResult Remove(long id)
        {
            _CRUDAppService.Remove(id);

            return Response();
        }
    }
}
