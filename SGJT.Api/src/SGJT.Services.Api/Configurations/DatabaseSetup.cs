using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SGJT.Infra.Data.Contexts;

namespace SGJT.Services.Api.Configurations
{
    public static class DatabaseSetup
    {
        public static void AddDatabaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SGJTContext>(options =>
                {
                    options.UseSqlServer(configuration.GetConnectionString("SGJT"));
                });
        }
    }
}
