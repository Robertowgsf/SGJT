using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SGJT.Infra.Data.Contexts;

namespace SGJT.Services.Api.Configurations
{
    public static class DatabaseSetup
    {
        public static void AddDatabaseSetup(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<SGJTContext>(options =>
                {
                    options.UseLoggerFactory(LoggerFactory.Create(builder => builder.AddDebug()));
                    options.UseSqlServer(configuration.GetConnectionString("SGJT"));
                });
        }
    }
}
