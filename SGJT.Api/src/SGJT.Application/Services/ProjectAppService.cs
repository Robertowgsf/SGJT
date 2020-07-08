using AutoMapper;
using SGJT.Application.Interfaces;
using SGJT.Application.Validators.Project;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;

namespace SGJT.Application.Services
{
    public class ProjectAppService : CRUDAppService<ProjectViewModel, Project, AddProjectValidator>, IProjectAppService
    {
        public ProjectAppService(IMapper mapper, IRepository<Project> projectRepository, AddProjectValidator addProjectValidator)
            : base(mapper, projectRepository, addProjectValidator)
        {
        }
    }
}
