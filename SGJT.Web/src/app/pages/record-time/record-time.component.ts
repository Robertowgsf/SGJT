import { Component, OnInit } from '@angular/core';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { WorkingTimeRecordService } from 'src/app/shared/services/working-time-record.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-record-time',
  templateUrl: './record-time.component.html',
  styleUrls: ['./record-time.component.scss']
})
export class RecordTimeComponent implements OnInit {

  time = new Date();
  listDefinition = new ListDefinition();
  description = null;
  projects = [];
  selectedProject = null;

  constructor(
    private workingTimeRecordService: WorkingTimeRecordService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    // Atualiza o tempo na página.
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    this.listDefinition.title = "Registros de Trabalho";
    this.listDefinition.columns = [
      new ListColumnDefinition("recordDate", "Data"),
      new ListColumnDefinition("type", "Tipo"),
      new ListColumnDefinition("project", "Projeto"),
      new ListColumnDefinition("description", "Descrição")
    ];

    this.getRegisterWorkingTimeRecords();
    this.getProjects();
  }

  registerWorkingTimeRecord() {
    let project = this.selectedProject ? parseInt(this.selectedProject) : this.selectedProject;
    this.workingTimeRecordService.registerWorkingTimeRecord({ description: this.description, user: localStorage.getItem("username"), project: this.selectedProject }).subscribe(success => {
      this.getRegisterWorkingTimeRecords();
    }, error => {
      console.log(error);
    });
  }

  getRegisterWorkingTimeRecords() {
    this.workingTimeRecordService.getByUsername(localStorage.getItem("username")).subscribe(success => {
      this.listDefinition.dataSource = success as any;
    }, error => {
      console.log(error);
    })
  }

  getProjects() {
    this.projectService.get().subscribe(success => {
      this.projects = success;
    })
  }
}