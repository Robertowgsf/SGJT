import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegisterComponent } from './user/user-register.component';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'user', redirectTo: 'user/new' },
  { path: 'user/new', component: UserRegisterComponent },
  { path: 'user/:id', component: UserRegisterComponent },
];

@NgModule({
  declarations: [
    RegisterComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
