import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { ProfileComponent } from './profile/profile.component';
import { ConsultationListComponent } from './consultation/consultation-list/consultation-list.component';



@NgModule({
  declarations: [DashbaordComponent, ProfileComponent, ConsultationListComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
