import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';
import { ActivatedRoute, Params } from '@angular/router';
import { FormDefinition } from 'src/app/shared/models/form-definition.model';
import { FormFieldDefinition } from 'src/app/shared/models/form-field-definition.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';

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
    new FormFieldDefinition("name", "Nome", "Digite um nome", "text"),
    new FormFieldDefinition("dailyHours", "Horas Diárias", "Digite a quantidade de horas diárias", "number")
  ];
  userFormGroup: FormGroup;
  userFormDefinition: FormDefinition;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFormDefinition();

    this.route.params.subscribe((params: Params) => {
      let id = params['id'];

      if (id) {
        this.userService.get(id).subscribe(user => {
          this.userFormModel = user as User;
          this.createFormDefinition(user);
        });
      }
    });
  }

  createFormDefinition(user = null) {
    if (user) {
      this.userFormGroup = this.fb.group({
        id: [this.userFormModel.id],
        name: [this.userFormModel.name],
        dailyHours: [this.userFormModel.dailyHours]
      });
    }
    else {
      this.userFormGroup = this.fb.group({
        id: [],
        name: [],
        dailyHours: []
      });
    }
    
    this.userFormDefinition = new FormDefinition(this.userFormName, this.userFormModel, this.userFormFields, this.userFormGroup, this.userService);
  }
}
