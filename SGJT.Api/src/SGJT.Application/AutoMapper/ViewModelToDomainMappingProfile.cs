using AutoMapper;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<RegisterUserViewModel, User>();

            CreateMap<UserViewModel, User>()
                .ForMember(entity => entity.UserTeams, opt => opt.MapFrom(model => model.Teams))
                .AfterMap((model, entity) =>
                {
                    foreach (var userTeam in entity.UserTeams)
                    {
                        userTeam.User = entity;
                    }
                });

            CreateMap<UserViewModel, UserTeam>()
                .ForMember(entity => entity.User, opt => opt.MapFrom(model => model));

            CreateMap<TeamViewModel, Team>()
                .ForMember(entity => entity.UserTeams, opt => opt.MapFrom(model => model.Users))
                .AfterMap((model, entity) =>
                {
                    foreach (var userTeam in entity.UserTeams)
                    {
                        userTeam.Team = entity;
                    }
                });

            CreateMap<TeamViewModel, UserTeam>()
                .ForMember(entity => entity.Team, opt => opt.MapFrom(model => model));

            CreateMap<ProjectViewModel, Project>();
        }
    }
}
