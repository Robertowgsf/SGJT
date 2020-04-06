using AutoMapper;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;

namespace SGJT.Application.AutoMapper
{
    public class ViewModelToDomainMappingProfile : Profile
    {
        public ViewModelToDomainMappingProfile()
        {
            CreateMap<UserViewModel, User>().ForMember(a => a.Id, opt => opt.Ignore());
        }
    }
}
