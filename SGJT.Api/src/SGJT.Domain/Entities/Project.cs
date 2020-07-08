using System;

namespace SGJT.Domain.Entities
{
    public class Project : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int EstimatedHours { get; set; }
        public int WorkedHours { get; set; }
        public string Status { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime Deadline { get; set; }
    }
}
