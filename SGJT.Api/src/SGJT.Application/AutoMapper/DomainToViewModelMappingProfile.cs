using AutoMapper;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using System.Linq;

namespace SGJT.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<User, UserViewModel>()
                .ForMember(model => model.Teams, opt => opt.MapFrom(entity => entity.UserTeams.Select(a => a.Team)));

            CreateMap<Team, TeamViewModel>()
                .ForMember(model => model.Users, opt => opt.MapFrom(entity => entity.UserTeams.Select(a => a.User)));

            CreateMap<WorkingTimeRecord, WorkingTimeRecordViewModel>()
                .ForMember(model => model.RecordDate, opt => opt.MapFrom(entity => entity.RecordDate.ToString("dd/MM/yyyy HH:mm:ss")))
                .ForMember(model => model.User, opt => opt.MapFrom(entity => entity.User.Name))
                .ForMember(model => model.Project, opt => opt.MapFrom(entity => entity.Project.Name));

            CreateMap<Project, ProjectViewModel>()
                .ForMember(model => model.StartDate, opt => opt.MapFrom(entity => entity.StartDate.ToString("dd/MM/yyyy")))
                .ForMember(model => model.Deadline, opt => opt.MapFrom(entity => entity.Deadline.ToString("dd/MM/yyyy")))
                .ForMember(model => model.Teams, opt => opt.MapFrom(entity => entity.ProjectTeams.Select(a => a.Team)));;
        }
    }
}
