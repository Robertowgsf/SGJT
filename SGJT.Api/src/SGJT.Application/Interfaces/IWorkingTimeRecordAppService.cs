using SGJT.Application.ViewModels;
using System.Collections.Generic;

namespace SGJT.Application.Interfaces
{
    public interface IWorkingTimeRecordAppService
    {
        void RegisterWorkingTimeRecord(AddWorkingTimeRecordViewModel addWorkingTimeRecordViewModel);
        IList<WorkingTimeRecordViewModel> GetByUsername(string name);
        IList<WorkingTimeRecordViewModel> Get();
    }
}
