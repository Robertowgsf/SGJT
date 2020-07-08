using SGJT.Application.ViewModels;

namespace SGJT.Application.Interfaces
{
    public interface ITeamAppService : ICRUDAppService<TeamViewModel>
    {
        void RemoverAssociacao(TeamViewModel teamViewModel);
    }
}
