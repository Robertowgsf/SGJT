import { Component, OnInit } from '@angular/core';
import { ListDefinition } from 'src/app/shared/models/list/list-definition.model';
import { ListColumnDefinition } from 'src/app/shared/models/list/list-column-definition.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  listDefinition = new ListDefinition();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.listDefinition.title = "Usuários";
    this.listDefinition.registerURL = "pages/registrations/register/user";
    this.listDefinition.columns = [
      new ListColumnDefinition("name", "Nome"),
    ];

    this.userService.get().subscribe(success => {
      this.listDefinition.dataSource = success;
    });
  }
}
