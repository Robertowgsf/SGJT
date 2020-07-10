import { Component, OnInit } from '@angular/core';
import { FormDefinition } from 'src/app/shared/models/form/form-definition.model';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { Project } from 'src/app/shared/models/entities/project.model';
import { FormFieldDefinition } from 'src/app/shared/models/form/form-field-definition.model';
import { ProjectService } from 'src/app/shared/services/project.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-project-register',
  templateUrl: './project-register.component.html',
  styleUrls: ['./project-register.component.scss']
})
export class ProjectRegisterComponent implements OnInit {

  formDefinition = new FormDefinition();
  listDefinitions = new Array<ListDefinition>();
  teamListDefinition = new ListDefinition();
  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    // Definição do formulário de projeto.
    this.formDefinition.name = "Projeto";
    this.formDefinition.model = new Project();
    this.formDefinition.fields = [
      new FormFieldDefinition("name", "Nome", "Digite um nome", "text"),
      new FormFieldDefinition("description", "Descrição", "Digite uma descrição", "text"),
      new FormFieldDefinition("estimatedHours", "Horas Estimadas", "Digite a quantidade de horas estimadas", "number"),
      new FormFieldDefinition("status", "Status", "Digite o status", "text"),
      new FormFieldDefinition("startDate", "Data de Início", "Digite a data de início", "date"),
      new FormFieldDefinition("deadline", "Data de Entrega", "Digite a data de entrega", "date")
    ];
    this.formDefinition.service = this.projectService;

    this.teamListDefinition.title = "Times";
    this.teamListDefinition.columns = [
      new ListColumnDefinition("name", "Nome")
    ];
    this.teamListDefinition.newEntryName = "Time";
    this.teamListDefinition.propertyName = "teams";
    this.teamListDefinition.newEntryDatasource = [];
    this.getTeamNewEntryDatasource();
    this.teamListDefinition.service = this.projectService;
    // Função para remover o usuário do time.
    this.teamListDefinition.addNewAssociation = function userListAddNewAssociation(id: number, name: string) {
      return this.service.addAssociation(id, name);
    };
    this.listDefinitions.push(this.teamListDefinition);

    this.createFormGroup();

    this.route.params.subscribe((params: Params) => {
      let id = params['id'];

      if (id) {
        this.projectService.get(id).subscribe(project => {
          this.formDefinition.model = project as Project;
          this.createFormGroup(project);
          this.teamListDefinition.dataSource = project.teams;
        });
      }
    });
  }

  createFormGroup(project = null) {
    if (project) {
      this.formDefinition.formGroup = this.fb.group({
        id: [this.formDefinition.model.id],
        name: [this.formDefinition.model.name],
        description: [this.formDefinition.model.description],
        estimatedHours: [this.formDefinition.model.estimatedHours],
        status: [this.formDefinition.model.status],
        startDate: [this.formDefinition.model.startDate],
        deadline: [this.formDefinition.model.deadline]
      });
    }
    else {
      this.formDefinition.formGroup = this.fb.group({
        id: [],
        name: [],
        description: [],
        estimatedHours: [],
        status: [],
        startDate: [],
        deadline: []
      });
    }
  }

  getTeamNewEntryDatasource() {
    this.teamService.get().subscribe(success => {
      this.teamListDefinition.newEntryDatasource = success;
    });
  }

}
