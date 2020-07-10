using System.Collections.Generic;

namespace SGJT.Domain.Entities
{
    public class User : Entity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public ICollection<UserTeam> UserTeams { get; set; }
        public ICollection<ProjectUser> ProjectUsers { get; set; }
        public ICollection<WorkingTimeRecord> WorkingTimeRecords { get; set; }
    }
}
