import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guard/authGuard';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule } from '@coreui/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { IconModule, IconSetModule } from '@coreui/icons-angular';
import { DefaultLayoutComponent } from './container';
import { jwtinterceptor } from './_interceptor/jwtinterceptor';



@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,   
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    IconModule,
    IconSetModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [
    AuthGuard,
    {
      provide:LocationStrategy, useClass:HashLocationStrategy

    },
    {
      provide:HTTP_INTERCEPTORS, useClass:jwtinterceptor, multi:true
    }
     
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
