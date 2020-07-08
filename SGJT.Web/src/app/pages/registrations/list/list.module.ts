import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list.component';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TeamListComponent } from './team/team-list.component';
import { ProjectListComponent } from './project/project-list.component';

const routes: Routes = [
  { path: 'user', component: UserListComponent },
  { path: 'team', component: TeamListComponent },
  { path: 'project', component: ProjectListComponent }
];

@NgModule({
  declarations: [
    ListComponent,
    UserListComponent,
    TeamListComponent,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class ListModule { }
