using System.Collections.Generic;

namespace SGJT.Application.ViewModels
{
    public class UserViewModel
    {
        public long? Id { get; set; }
        public string Name { get; set; }
        public int DailyHours { get; set; }
        public ICollection<TeamViewModel> Teams { get; set; }
    }
}
