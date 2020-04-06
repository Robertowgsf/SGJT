using System.Collections.Generic;

namespace SGJT.Domain.Entities
{
    public class Team : Entity
    {
        public string Name { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
    }
}
