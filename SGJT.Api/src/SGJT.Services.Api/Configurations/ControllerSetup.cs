using Microsoft.Extensions.DependencyInjection;

namespace SGJT.Services.Api.Configurations
{
    public static class ControllerSetup
    {
        public static void AddControllerSetup(this IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }
    }
}
