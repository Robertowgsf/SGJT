using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using SGJT.Application.AutoMapper;
using System;

namespace SGJT.Services.Api.Configurations
{
    public static class AutoMapperSetup
    {
        public static void AddAutoMapperSetup(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(DomainToViewModelMappingProfile), typeof(ViewModelToDomainMappingProfile));
        }
    }
}
