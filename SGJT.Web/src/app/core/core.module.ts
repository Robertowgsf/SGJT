import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { InterceptorProviders } from './interceptors';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutModule
  ],
  providers: [
    InterceptorProviders
  ]
})
export class CoreModule { }
