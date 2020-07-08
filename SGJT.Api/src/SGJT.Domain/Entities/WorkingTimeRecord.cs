using System;

namespace SGJT.Domain.Entities
{
    public class WorkingTimeRecord : Entity
    {
        public DateTime RecordDate { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
    }
}
