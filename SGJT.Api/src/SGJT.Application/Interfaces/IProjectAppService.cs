using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.Interfaces
{
    public interface IProjectAppService : ICRUDAppService<ProjectViewModel, Project>
    {
        TeamViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel);
        void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel);
    }
}
