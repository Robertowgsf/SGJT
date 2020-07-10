import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  readonly menusGestor = [
    {
      name: "Apontar Horas",
      route: "timeRecord",
      icon: "fas fa-stopwatch",
      submenus: []
    },
    { 
      name: "Cadastros",
      route: "registrations",
      icon: "fa fa-edit", 
      submenus: [
        { name: "Usuário", route: "registrations/list/user", icon: "fa fa-user", submenus: 0 },
        { name: "Time", route: "registrations/list/team", icon: "fa fa-users", submenus: 0 },
        { name: "Projeto", route: "registrations/list/project", icon: "fas fa-file", submenus: 0 }
      ] 
    },
    {
      name: "Relatórios",
      route: "reports",
      icon: "fas fa-copy",
      submenus: [
        { name: "Apontamento", route: "reports/apointment", icon: "fas fa-stopwatch", submenus: 0 }
      ]
    }
  ];

  readonly menusUsuario = [
    {
      name: "Apontar Horas",
      route: "timeRecord",
      icon: "fas fa-stopwatch",
      submenus: []
    }
  ];

  menus = [];
  
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("role") == "Gestor") {
      this.menus = this.menusGestor;
    }
    else {
      this.menus = this.menusUsuario;
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl("authentication/login");
  }

}
