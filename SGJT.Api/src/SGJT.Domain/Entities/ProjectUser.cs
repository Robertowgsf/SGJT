namespace SGJT.Domain.Entities
{
    public class ProjectUser : Entity
    {
        public Project Project { get; set; }
        public User User { get; set; }
    }
}
