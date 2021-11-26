import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RouterModule } from '@angular/router';
import { PricingComponent } from './pricing/pricing.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    HomeComponent, AppointmentComponent, PricingComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    HomeRoutingModule,
    RouterModule,
    CarouselModule
  ]
})
export class HomeModule { }
