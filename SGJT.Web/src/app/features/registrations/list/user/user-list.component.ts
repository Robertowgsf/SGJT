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
