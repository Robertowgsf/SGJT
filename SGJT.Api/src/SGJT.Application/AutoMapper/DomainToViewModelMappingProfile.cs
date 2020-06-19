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
        }
    }
}
