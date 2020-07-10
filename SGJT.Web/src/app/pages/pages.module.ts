import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { MainComponent } from '../core/layout/main/main.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RecordTimeComponent } from './record-time/record-time.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'pages', redirectTo: 'pages/timeRecord' },
  {
    path: 'pages',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'registrations', loadChildren: () => import('./registrations/registrations.module').then(m => m.RegistrationsModule) },
      { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
      { path: 'timeRecord', component: RecordTimeComponent }
    ]
  },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) }
];

@NgModule({
  declarations: [
    RecordTimeComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class PagesModule { }
