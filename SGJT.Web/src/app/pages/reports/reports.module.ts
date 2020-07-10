import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApointmentReportComponent } from './apointment/apointment-report.component';
import { ListModule } from '../registrations/list/list.module';

const routes: Routes = [
  { path: 'apointment', component: ApointmentReportComponent }
];

@NgModule({
  declarations: [
    ApointmentReportComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListModule
  ]
})
export class ReportsModule { }
