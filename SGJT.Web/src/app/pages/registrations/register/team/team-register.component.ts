import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/shared/models/entities/team.model';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { FormFieldDefinition } from 'src/app/shared/models/form/form-field-definition.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormDefinition } from 'src/app/shared/models/form/form-definition.model';
import { TeamService } from 'src/app/shared/services/team.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';

@Component({
  selector: 'app-team-register',
  templateUrl: './team-register.component.html',
  styleUrls: ['./team-register.component.scss']
})
export class TeamRegisterComponent implements OnInit {

  formDefinition = new FormDefinition();
  listDefinitions = new Array<ListDefinition>();
  userListDefinition = new ListDefinition();

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // Definição do formulário de time.
    this.formDefinition.name = "Time";
    this.formDefinition.model = new Team();
    this.formDefinition.fields = [
      new FormFieldDefinition("name", "Nome", "Digite um nome", "text"),
    ];
    this.formDefinition.service = this.teamService;
    
    // Definição das listas do time.
    this.userListDefinition.title = "Usuários";
    this.userListDefinition.registerURL = "registrations/register/user";
    this.userListDefinition.columns = [
      new ListColumnDefinition("name", "Nome"),
      new ListColumnDefinition("dailyHours", "Horas Diárias")
    ];
    this.userListDefinition.propertyName = "users";
    
    this.listDefinitions.push(this.userListDefinition);
    this.createFormGroup();

    this.route.params.subscribe((params: Params) => {
      let id = params['id'];

      if (id) {
        this.teamService.get(id).subscribe(team => {
          this.formDefinition.model = team as Team;
          this.createFormGroup(team);
          this.userListDefinition.dataSource = team.users;
        });
      }
    });
  }

  createFormGroup(team = null) {
    if (team) {
      this.formDefinition.formGroup = this.fb.group({
        id: [this.formDefinition.model.id],
        name: [this.formDefinition.model.name],
      });
    }
    else {
      this.formDefinition.formGroup = this.fb.group({
        id: [],
        name: [],
      });
    }
  }
}
