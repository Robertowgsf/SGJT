import { Component, OnInit } from '@angular/core';
import { ListDefinition } from 'src/app/shared/models/list-definition.model';
import { ListColumnDefinition } from 'src/app/shared/models/list-column-definition.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  title = "Usuários";
  registerURL = "registrations/register/user";
  columns = [
    new ListColumnDefinition("name", "Nome"),
    new ListColumnDefinition("dailyHours", "Horas Diárias")
  ];

  // dataSource = [
  //   { id: 1, nome: "Usuário Teste 1", telefone: "11 1 11111111" },
  //   { id: 2, nome: "Usuário Teste 2", telefone: "22 2 22222222" },
  //   { id: 3, nome: "Usuário Teste 3", telefone: "33 3 33333333" },
  //   { id: 4, nome: "Usuário Teste 4", telefone: "44 4 44444444" },
  //   { id: 5, nome: "Usuário Teste 5", telefone: "55 5 55555555" },
  //   { id: 6, nome: "Usuário Teste 6", telefone: "66 6 66666666" },
  //   { id: 7, nome: "Usuário Teste 7", telefone: "77 7 77777777" },
  //   { id: 8, nome: "Usuário Teste 8", telefone: "88 8 88888888" },
  //   { id: 9, nome: "Usuário Teste 9", telefone: "99 9 99999999" },
  //   { id: 10, nome: "Usuário Teste 10", telefone: "10 1 01010101" },
  // ];

  listDefinition = new ListDefinition(this.title, this.registerURL, this.columns);

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.get().subscribe(success => {
      this.listDefinition.dataSource = success;
    });
  }
}
