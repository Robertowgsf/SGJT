import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CanDeactivateGuard } from './shared/guards/can-deactivate-guard.service';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    PagesModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
