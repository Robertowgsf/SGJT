import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user/user-register.component';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TeamRegisterComponent } from './team/team-register.component';
import { ProjectRegisterComponent } from './project/project-register.component';

const routes: Routes = [
  { path: 'user', redirectTo: 'user/new' },
  { path: 'user/new', component: UserRegisterComponent },
  { path: 'user/:id', component: UserRegisterComponent },
  { path: 'team', redirectTo: 'team/new' },
  { path: 'team/new', component: TeamRegisterComponent },
  { path: 'team/:id', component: TeamRegisterComponent },
  { path: 'project', redirectTo: 'project/new' },
  { path: 'project/new', component: ProjectRegisterComponent },
  { path: 'project/:id', component: ProjectRegisterComponent }
];

@NgModule({
  declarations: [
    RegisterComponent,
    UserRegisterComponent,
    TeamRegisterComponent,
    ProjectRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RegisterModule { }
