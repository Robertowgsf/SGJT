using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using FluentValidation.Results;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace SGJT.Application.Services
{
    public class CRUDAppService<TViewModel, TEntity, TAddValidator> : ICRUDAppService<TViewModel, TEntity>
        where TViewModel : class
        where TEntity : Entity
        where TAddValidator : IValidator
    {
        private readonly IMapper _mapper;
        private readonly IRepository<TEntity> _repository;
        private readonly TAddValidator _addValidator;

        public CRUDAppService(IMapper mapper, IRepository<TEntity> repository, TAddValidator addValidator)
        {
            _mapper = mapper;
            _repository = repository;
            _addValidator = addValidator;
        }

        // Validação para adicionar view model.
        public IList<ValidationError> ValidateAddViewModel(TViewModel viewModel)
        {
            ValidationResult validation = _addValidator.Validate(viewModel);

            return validation.GetValidationResultErrors();
        }

        // Adiciona uma nova entidade.
        public TEntity Add(TViewModel viewModel)
        {
            var entity = _mapper.Map<TEntity>(viewModel);

            _repository.Add(entity);
            _repository.SaveChanges();

            return entity;
        }

        // Obtém uma entidade pelo Id.
        public TViewModel Get(long id)
        {
            var entity = _repository.Get().Where(entity => entity.Id == id);
            var viewModel = entity.ProjectTo<TViewModel>(_mapper.ConfigurationProvider).FirstOrDefault();

            return viewModel;
        }

        // Obtém todas as entidades do tipo atual.
        public IEnumerable<TViewModel> Get()
        {
            var entities = _repository.Get();
            var viewModels = _mapper.Map<IEnumerable<TViewModel>>(entities);

            return viewModels;
        }

        // Atualiza uma entidade.
        public IList<ValidationError> Update(TViewModel viewModel)
        {
            ValidationResult validation = _addValidator.Validate(viewModel);

            if (validation.IsValid)
            {
                var entity = _repository.Get().Where(entity => entity.Id == 1);
                var mappedEntity = _mapper.Map<TEntity>(viewModel);

                _repository.Update(mappedEntity);
                _repository.SaveChanges();
            }

            return validation.GetValidationResultErrors();
        }

        // Remove uma entidade.
        public void Remove(long id)
        {
            _repository.Remove(id);
            _repository.SaveChanges();
        }
    }
}
