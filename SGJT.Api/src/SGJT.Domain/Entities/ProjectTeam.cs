namespace SGJT.Domain.Entities
{
    public class ProjectTeam : Entity
    {
        public Project Project { get; set; }
        public Team Team { get; set; }
    }
}
