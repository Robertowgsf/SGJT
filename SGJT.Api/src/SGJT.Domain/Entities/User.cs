using System.Collections.Generic;

namespace SGJT.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public int DailyHours { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
    }
}
