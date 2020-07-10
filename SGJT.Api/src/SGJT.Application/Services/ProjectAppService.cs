using AutoMapper;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators.Project;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System.Linq;

namespace SGJT.Application.Services
{
    public class ProjectAppService : CRUDAppService<ProjectViewModel, Project, AddProjectValidator>, IProjectAppService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Project> _projectRepository;
        private readonly IRepository<Team> _teamRepository;
        private readonly IRepository<ProjectTeam> _projectTeamRepository;

        public ProjectAppService(IMapper mapper, IRepository<Project> projectRepository, AddProjectValidator addProjectValidator, IRepository<Team> teamRepository, IRepository<ProjectTeam> projectTeamRepository)
            : base(mapper, projectRepository, addProjectValidator)
        {
            _projectRepository = projectRepository;
            _teamRepository = teamRepository;
            _projectTeamRepository = projectTeamRepository;
            _mapper = mapper;
        }

        public TeamViewModel AddAssociation(AddAssociationViewModel addAssociationViewModel)
        {
            var project = _projectRepository.Get(addAssociationViewModel.FirstId);
            var team = _teamRepository.Get().FirstOrDefault(team => team.Id == addAssociationViewModel.SecondId);

            if (team == null)
            {
                return null;
            }

            _projectTeamRepository.Add(new ProjectTeam { Team = team, Project = project });
            _projectTeamRepository.SaveChanges();

            var teamViewModel = _mapper.Map<TeamViewModel>(team);

            return teamViewModel;
        }

        public void RemoveAssociation(RemoveAssociationViewModel removeAssociationViewModel)
        {
            var projectTeam = _projectTeamRepository.Get().FirstOrDefault(projectTeam => projectTeam.Project.Id == removeAssociationViewModel.FirstId && projectTeam.Team.Id == removeAssociationViewModel.SecondId);

            if (projectTeam != null)
            {
                _projectTeamRepository.Remove(projectTeam.Id);
                _projectTeamRepository.SaveChanges();
            }
        }
    }
}
