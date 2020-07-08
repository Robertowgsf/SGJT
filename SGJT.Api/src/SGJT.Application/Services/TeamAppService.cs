using AutoMapper;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators.Team;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System.Linq;

namespace SGJT.Application.Services
{
    public class TeamAppService : CRUDAppService<TeamViewModel, Team, AddTeamValidator>, ITeamAppService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Team> _teamRepository;

        public TeamAppService(IMapper mapper, IRepository<Team> teamRepository, AddTeamValidator addTeamValidator)
            : base(mapper, teamRepository, addTeamValidator)
        {
            _mapper = mapper;
            _teamRepository = teamRepository;
        }

        public void RemoverAssociacao(TeamViewModel teamViewModel)
        {
            //var entityVm = _mapper.Map<Team>(teamViewModel);
            //var entity = _teamRepository.Get()
            //entity.UserTeams = entityVm.UserTeams;


            //_teamRepository.Update(entity);
            //_teamRepository.SaveChanges();
        }
    }
}
