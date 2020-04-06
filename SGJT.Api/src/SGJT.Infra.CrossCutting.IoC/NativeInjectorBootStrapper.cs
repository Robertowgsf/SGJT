using Microsoft.Extensions.DependencyInjection;
using SGJT.Application.Interfaces;
using SGJT.Application.Services;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using SGJT.Infra.Data.Contexts;
using SGJT.Infra.Data.Repositories;

namespace SGJT.Infra.CrossCutting.IoC
{
    public static class NativeInjectorBootStrapper
    {
        public static void RegisterServices(IServiceCollection services)
        {
            // Application
            services.AddScoped<IUserAppService, UserAppService>();

            // Infra - Data.
            services.AddScoped<SGJTContext>();
            services.AddScoped<IRepository<User>, Repository<User>>();
        }
    }
}
