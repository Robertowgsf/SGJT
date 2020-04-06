using AutoMapper;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.AutoMapper
{
    public class DomainToViewModelMappingProfile : Profile
    {
        public DomainToViewModelMappingProfile()
        {
            CreateMap<User, UserViewModel>();
        }
    }
}
