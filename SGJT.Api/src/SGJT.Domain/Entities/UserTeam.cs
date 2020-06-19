namespace SGJT.Domain.Entities
{
    public class UserTeam : Entity
    {
        public User User { get; set; }
        public Team Team { get; set; }
    }
}
