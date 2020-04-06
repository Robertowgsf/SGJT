namespace SGJT.Domain.Entities
{
    public class UserTeam
    {
        public long UserId { get; set; }
        public User User { get; set; }
        public long TeamId { get; set; }
        public Team Team { get; set; }
    }
}
