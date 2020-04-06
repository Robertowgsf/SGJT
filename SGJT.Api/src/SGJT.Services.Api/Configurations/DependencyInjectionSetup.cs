using Microsoft.Extensions.DependencyInjection;
using SGJT.Infra.CrossCutting.IoC;

namespace SGJT.Services.Api.Configurations
{
    public static class DependencyInjectionSetup
    {
        public static void AddDependencyInjectionSetup(this IServiceCollection services)
        {
            NativeInjectorBootStrapper.RegisterServices(services);
        }
    }
}
