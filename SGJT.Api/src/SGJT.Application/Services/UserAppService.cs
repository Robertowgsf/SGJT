using AutoMapper;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators.User;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System.Linq;

namespace SGJT.Application.Services
{
    public class UserAppService : CRUDAppService<UserViewModel, User, AddUserValidator>, IUserAppService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Team> _teamRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<UserTeam> _userTeamRepository;

        public UserAppService(IMapper mapper, IRepository<User> userRepository, AddUserValidator addUserValidator, IRepository<Team> teamRepository, IRepository<UserTeam> userTeamRepository)
            : base(mapper, userRepository, addUserValidator)
        {
            _mapper = mapper;
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _userTeamRepository = userTeamRepository;
        }

        public TeamViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel)
        {
            var user = _userRepository.Get(addAssociationViewModel.FirstId);
            var team = _teamRepository.Get().FirstOrDefault(team => team.Id == addAssociationViewModel.SecondId);

            if (team == null)
            {
                return null;
            }

            _userTeamRepository.Add(new UserTeam { Team = team, User = user });
            _userTeamRepository.SaveChanges();

            var teamViewModel = _mapper.Map<TeamViewModel>(team);

            return teamViewModel;
        }

        public void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel)
        {
            var userTeam = _userTeamRepository.Get().FirstOrDefault(userTeam => userTeam.User.Id == removeAssociationViewModel.FirstId && userTeam.Team.Id == removeAssociationViewModel.SecondId);

            if (userTeam != null)
            {
                _userTeamRepository.Remove(userTeam.Id);
                _userTeamRepository.SaveChanges();
            }
        }
    }
}
