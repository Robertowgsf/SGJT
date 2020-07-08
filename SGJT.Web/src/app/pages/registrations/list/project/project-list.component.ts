import { Component, OnInit } from '@angular/core';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { ProjectService } from 'src/app/shared/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  listDefinition = new ListDefinition();

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.listDefinition.title = "Projetos";
    this.listDefinition.registerURL = "pages/registrations/register/project";
    this.listDefinition.columns = [
      new ListColumnDefinition("name", "Nome"),
      new ListColumnDefinition("status", "Status"),
      new ListColumnDefinition("estimatedHours", "Horas Estimadas"),
      new ListColumnDefinition("startDate", "Data de Início"),
      new ListColumnDefinition("deadline", "Data de Entrega")
    ];
    this.listDefinition.newEntryName = "Projeto";

    this.projectService.get().subscribe(success => {
      this.listDefinition.dataSource = success;
    });
  }

}
