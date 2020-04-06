import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list.component';
import { ListComponent } from './list.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'user', component: UserListComponent },
];

@NgModule({
  declarations: [
    ListComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ListModule { }
