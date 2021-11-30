import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorSelectionComponent } from './doctor-selection/doctor-selection.component';
import { PsycologyComponent } from './psycology/psycology.component';
import { PhysiotherapyComponent } from './physiotherapy/physiotherapy.component';



@NgModule({
  declarations: [
    DoctorSelectionComponent,
    PsycologyComponent,
    PhysiotherapyComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
