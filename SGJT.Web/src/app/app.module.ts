import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';

// const routes: Routes = [
//   { path: 'list', loadChildren: () => import('./features/list/list.module').then(m => m.ListModule) },
//   { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule) },
// ];

const routes: Routes = [
  { path: 'registrations', loadChildren: () => import('./features/registrations/registrations.module').then(m => m.RegistrationsModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CoreModule,
  ],
  providers: [
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
