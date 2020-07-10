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
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserTeam> _userTeamRepository;

        public TeamAppService(IMapper mapper, IRepository<Team> teamRepository, AddTeamValidator addTeamValidator, IRepository<User> userRepository, IRepository<UserTeam> userTeamRepository)
            : base(mapper, teamRepository, addTeamValidator)
        {
            _mapper = mapper;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _userTeamRepository = userTeamRepository;
        }

        public UserViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel)
        {
            var team = _teamRepository.Get(addAssociationViewModel.FirstId);
            var user = _userRepository.Get().FirstOrDefault(user => user.Id == addAssociationViewModel.SecondId);

            if (user == null)
            {
                return null;
            }

            _userTeamRepository.Add(new UserTeam { Team = team, User = user });
            _userTeamRepository.SaveChanges();

            var userViewModel = _mapper.Map<UserViewModel>(user);

            return userViewModel;
        }

        public void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel)
        {
            var userTeam = _userTeamRepository.Get().FirstOrDefault(userTeam => userTeam.Team.Id == removeAssociationViewModel.FirstId && userTeam.User.Id == removeAssociationViewModel.SecondId);

            if (userTeam != null)
            {
                _userTeamRepository.Remove(userTeam.Id);
                _userTeamRepository.SaveChanges();
            }
        }
    }
}
