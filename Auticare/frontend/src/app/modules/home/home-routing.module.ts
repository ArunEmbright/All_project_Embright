import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PricingComponent } from './pricing/pricing.component';
const routes: Routes=[
  {
    path:'assessments',
    component: HomeComponent
  },
  {
    path:'appointments',
    component:AppointmentComponent
  },
  {
    path:'pricing',
    component:PricingComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeRoutingModule { }
