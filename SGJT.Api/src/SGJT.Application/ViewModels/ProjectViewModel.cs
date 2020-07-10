using System.Collections.Generic;

namespace SGJT.Application.ViewModels
{
    public class ProjectViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int EstimatedHours { get; set; }
        public int WorkedHours { get; set; }
        public string Status { get; set; }
        public string StartDate { get; set; }
        public string Deadline { get; set; }
        public ICollection<TeamViewModel> Teams { get; set; }
    }
}
