using AutoMapper;
using AutoMapper.QueryableExtensions;
using SGJT.Application.Interfaces;
using SGJT.Application.ViewModels;
using SGJT.Domain.Entities;
using SGJT.Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SGJT.Application.Services
{
    public class WorkingTimeRecordAppService : IWorkingTimeRecordAppService
    {
        private readonly IRepository<WorkingTimeRecord> _workingTimeRecordRepository;
        private readonly IRepository<User> _userRepository;
        private readonly IRepository<Project> _projectRepository;
        private readonly IMapper _mapper;

        public WorkingTimeRecordAppService(IRepository<WorkingTimeRecord> workingTimeRecordRepository, IRepository<User> userRepository, IMapper mapper, IRepository<Project> projectRepository)
        {
            _workingTimeRecordRepository = workingTimeRecordRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _projectRepository = projectRepository;
        }

        public void RegisterWorkingTimeRecord(AddWorkingTimeRecordViewModel addWorkingTimeRecordViewModel)
        {
            var user = _userRepository.Get().FirstOrDefault(user => user.Name == addWorkingTimeRecordViewModel.User);
            var lastWt = _workingTimeRecordRepository.Get().Where(a => a.User.Id == user.Id).OrderByDescending(a => a.Id).FirstOrDefault();
            var project = _projectRepository.Get().FirstOrDefault(project => project.Id == addWorkingTimeRecordViewModel.Project);
            
            string wtType = "Entrada";
            
            if (lastWt != null && lastWt.Type == "Entrada")
            {
                wtType = "Saída";
            }

            WorkingTimeRecord workingTimeRecord = new WorkingTimeRecord
            {
                RecordDate = DateTime.Now,
                Description = addWorkingTimeRecordViewModel.Description,
                Type = wtType,
                User = user,
                Project = project
            };
            
            _workingTimeRecordRepository.Add(workingTimeRecord);
            _workingTimeRecordRepository.SaveChanges();
        }

        public IList<WorkingTimeRecordViewModel> GetByUsername(string name)
        {
            var wtRecords = _workingTimeRecordRepository.Get().Where(wt => wt.User.Name == name).OrderByDescending(a => a.RecordDate).ProjectTo<WorkingTimeRecordViewModel>(_mapper.ConfigurationProvider).ToList();

            return wtRecords;
        }

        public IList<WorkingTimeRecordViewModel> Get()
        {
            var wtRecords = _workingTimeRecordRepository.Get().OrderByDescending(a => a.RecordDate).ProjectTo<WorkingTimeRecordViewModel>(_mapper.ConfigurationProvider).ToList();

            return wtRecords;
        }
    }
}
