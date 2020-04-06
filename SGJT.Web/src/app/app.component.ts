import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';
  
  readonly menus = [
    { name: "Cadastros", route: "registrations", submenus: [{ name: "Usuário", route: "registrations/list/user", submenus: 0 }] }
  ];
}
