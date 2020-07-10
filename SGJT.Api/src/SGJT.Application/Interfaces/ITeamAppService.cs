using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.Interfaces
{
    public interface ITeamAppService : ICRUDAppService<TeamViewModel, Team>
    {
        UserViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel);
        void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel);
    }
}
