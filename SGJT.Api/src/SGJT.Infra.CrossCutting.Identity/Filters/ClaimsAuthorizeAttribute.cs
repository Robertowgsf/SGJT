using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SGJT.Infra.CrossCutting.Identity.Filters
{
    public class ClaimsAuthorizeAttribute : TypeFilterAttribute
    {
        public ClaimsAuthorizeAttribute(string claimName) : base(typeof(RequestClaimFilter))
        {
            Arguments = new object[] { new Claim(claimName, claimName) };
        }
    }
}
