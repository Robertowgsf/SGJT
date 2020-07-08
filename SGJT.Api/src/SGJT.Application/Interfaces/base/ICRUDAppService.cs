using SGJT.Application.Validators;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface ICRUDAppService<TViewModel>
        where TViewModel : class
    {
        IList<ValidationError> Add(TViewModel viewModel);
        TViewModel Get(long id);
        IEnumerable<TViewModel> Get();
        IList<ValidationError> Update(TViewModel viewModel);
        void Remove(long id);
    }
}
