import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/entities/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FormDefinition } from 'src/app/shared/models/form/form-definition.model';
import { FormFieldDefinition } from 'src/app/shared/models/form/form-field-definition.model';
import { FormBuilder } from '@angular/forms';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  formDefinition = new FormDefinition();
  listDefinitions = new Array<ListDefinition>();
  teamListDefinition = new ListDefinition();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    // Definição do formulário de usuário.
    this.formDefinition.name = "Usuario";
    this.formDefinition.model = new User();
    this.formDefinition.fields = [
      new FormFieldDefinition("name", "Nome", "Digite um nome", "text")
    ];
    this.formDefinition.service = this.userService;

    // Definição das listas do usuário.
    this.teamListDefinition.title = "Times";
    this.teamListDefinition.registerURL = "registrations/register/team";
    this.teamListDefinition.columns = [
      new ListColumnDefinition("name", "Nome")
    ];
    this.teamListDefinition.newEntryName = "Time";
    this.teamListDefinition.propertyName = "teams";
    this.teamListDefinition.service = this.userService;
    // Função para remover o usuário do time.
    this.teamListDefinition.addNewAssociation = function userListAddNewAssociation(id: number, name: string) {
      return this.service.addAssociation(id, name);
    };

    this.getUserNewEntryDatasource();
    this.listDefinitions.push(this.teamListDefinition);
    this.createFormGroup();

    // Verifica se a página foi iniciada para cadastro de novo usuário ou alteração de um existente.
    this.route.params.subscribe((params: Params) => {
      let id = params['id'];

      if (id) {
        this.userService.get(id).subscribe(user => {
          this.formDefinition.model = user as User;
          this.createFormGroup(user);
          this.teamListDefinition.dataSource = user.teams;
        });
      }
    });
  }

  createFormGroup(user = null) {
    if (user) {
      this.formDefinition.formGroup = this.fb.group({
        id: [this.formDefinition.model.id],
        name: [this.formDefinition.model.name]
      });
    }
    else {
      this.formDefinition.formGroup = this.fb.group({
        id: [],
        name: []
      });
    }
  }

  getUserNewEntryDatasource() {
    this.teamService.get().subscribe(success => {
      this.teamListDefinition.newEntryDatasource = success;
    });
  }
}
