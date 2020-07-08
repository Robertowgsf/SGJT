using Microsoft.AspNetCore.Http;
using System.Linq;

namespace SGJT.Infra.CrossCutting.Identity.Filters
{
    public class CustomAuthorization
    {
        public static bool ValidateUserClaims(HttpContext context, string claimName)
        {
            return context.User.Identity.IsAuthenticated && context.User.Claims.Any(c => c.Type == claimName);
        }
    }
}
