using SGJT.Application.Validators;
using SGJT.Domain.Entities;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface ICRUDAppService<TViewModel, TEntity>
        where TViewModel : class
        where TEntity : Entity
    {
        IList<ValidationError> ValidateAddViewModel(TViewModel viewModel);
        TEntity Add(TViewModel viewModel);
        TViewModel Get(long id);
        IEnumerable<TViewModel> Get();
        IList<ValidationError> Update(TViewModel viewModel);
        void Remove(long id);
    }
}
