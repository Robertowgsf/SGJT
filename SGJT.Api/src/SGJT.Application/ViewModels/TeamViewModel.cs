using System.Collections.Generic;

namespace SGJT.Application.ViewModels
{
    public class TeamViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public ICollection<UserViewModel> Users { get; set; }
    }
}
