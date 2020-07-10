using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.Interfaces
{
    public interface IUserAppService : ICRUDAppService<UserViewModel, User>
    {
        TeamViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel);
        void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel);
    }
}
