import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { NgbNavModule, NgbAccordionModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { SharedModule } from './cyptolanding/shared/shared.module';


import { LayoutsModule } from './layouts/layouts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminModule } from './modules/admin/admin-module';
import { CalendarsModules } from './modules/calendar/calendar.module';
import { AssesmentModule } from './modules/assesment/assesment.module';
import {AuthModule} from './modules/auth/auth.module';
import { TherapistModule } from "./modules/therapist/therapist.module";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeModule } from './modules/home/home.module';
import { AdminLayoutsModule } from './adminLayout/layouts.module';

import { AuthenticationService } from './core/services/auth.service';
import { DoctorLayoutsModule } from './doctorLayout/layouts.module';
import { BookAppointmentModule } from './modules/book-appointment/book-appointment.module';
import { institutionLayoutModule } from './institutionLayout/layouts.module';






export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    
    
    
    
    
   
  
    
    
    
    
   

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LayoutsModule,
    DoctorLayoutsModule,
    AdminLayoutsModule,
    institutionLayoutModule,
    BookAppointmentModule,
    AssesmentModule,
    TherapistModule,
    HomeModule,
    AppRoutingModule,
    AdminModule,
    CalendarsModules,
    AuthModule,
    CarouselModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTooltipModule,
    SharedModule,
    ScrollToModule.forRoot(),

  ],
  bootstrap: [AppComponent],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},AuthenticationService
  ],
})
export class AppModule { }
