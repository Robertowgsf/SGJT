using Microsoft.Extensions.DependencyInjection;
using SGJT.Application.Interfaces;
using SGJT.Application.Services;
using SGJT.Application.Validators.Project;
using SGJT.Application.Validators.Team;
using SGJT.Application.Validators.User;
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
            services.AddScoped<IAuthAppService, AuthAppService>();
            services.AddScoped<IUserAppService, UserAppService>();
            services.AddScoped<ITeamAppService, TeamAppService>();
            services.AddScoped<IProjectAppService, ProjectAppService>();
            services.AddScoped<IWorkingTimeRecordAppService, WorkingTimeRecordAppService>();
            services.AddSingleton<AddUserValidator>();
            services.AddSingleton<AddTeamValidator>();
            services.AddSingleton<AddProjectValidator>();
            services.AddSingleton<RegisterUserValidator>();
            //services.AddSingleton<AddWorkingTimeRecordViewModel>();

            // Infra - Data.
            services.AddScoped<SGJTContext>();
            services.AddScoped<IRepository<User>, Repository<User>>();
            services.AddScoped<IRepository<Team>, Repository<Team>>();
            services.AddScoped<IRepository<Project>, Repository<Project>>();
            services.AddScoped<IRepository<WorkingTimeRecord>, Repository<WorkingTimeRecord>>();
            services.AddScoped<IRepository<UserTeam>, Repository<UserTeam>>();
            services.AddScoped<IRepository<ProjectTeam>, Repository<ProjectTeam>>();
        }
    }
}
