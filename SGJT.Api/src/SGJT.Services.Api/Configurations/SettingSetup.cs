using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SGJT.Application.Settings;

namespace SGJT.Services.Api.Configurations
{
    public static class SettingSetup
    {
        public static void AddSettingObjects(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettingsSection = configuration.GetSection("JWTSettings");
            services.Configure<JWTSettings>(jwtSettingsSection);
        }
    }
}
