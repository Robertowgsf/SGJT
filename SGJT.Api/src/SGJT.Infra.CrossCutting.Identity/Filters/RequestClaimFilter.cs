using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace SGJT.Infra.CrossCutting.Identity.Filters
{
    public class RequestClaimFilter : IAuthorizationFilter
    {
        private readonly Claim _claim;

        public RequestClaimFilter(Claim claim)
        {
            _claim = claim;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.User.Identity.IsAuthenticated)
            {
                context.Result = new StatusCodeResult(401);
                return;
            }

            if (!CustomAuthorization.ValidateUserClaims(context.HttpContext, _claim.Type))
            {
                context.Result = new StatusCodeResult(403);
            }
        }
    }
}
