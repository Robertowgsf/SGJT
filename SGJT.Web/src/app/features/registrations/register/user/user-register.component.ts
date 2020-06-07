import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ListColumnDefinition } from 'src/app/shared/models/list-column-definition.model';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FormDefinition } from 'src/app/shared/models/form-definition.model';
import { FormFieldDefinition } from 'src/app/shared/models/form-field-definition.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  listDefinition = new Array<ListDefinition>();

  // Definição do formulário do usuário.
  userFormName = "Usuários";
  userFormModel = new User();
  userFormFields = [
    new FormFieldDefinition("name", "Nome", this.userFormModel.name),
    new FormFieldDefinition("dailyHours", "Horas Diárias", this.userFormModel.dailyHours)
  ];
  userFormDefinition = new FormDefinition(this.userFormName, this.userFormModel, this.userFormFields);

  // Definição dos projetos.
  // projectTitle = "Projetos";
  // projectRegisterURL = "registrations/register/project";
  // projectColumns = [
  //   new ListColumnDefinition("Nome", "name"),
  //   new ListColumnDefinition("Status", "status"),
  //   new ListColumnDefinition("Horas Trabalhadas", "workedHours"),
  //   new ListColumnDefinition("Meta", "goal")
  // ];
  // projectModel = new Project();

  constructor(
    private userService: UserService,
    // private projectService: ProjectService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.listDefinition.push(new ListDefinition("Projetos", "registrations/register/project", this.projectColumns))

    this.route.params.subscribe((params: Params) => {
      let id = params['id'];

      if (id) {
        this.userService.get(id).subscribe(user => {
          this.userFormModel = user as User;
          this.userFormDefinition.model = this.userFormModel;
        });
      }
    });
  }

  // salvar() {

  // }

  // remover() {

  // }

}
