import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DoctorSelectionComponent } from './doctor-selection/doctor-selection.component';
import { PhysiotherapyComponent } from './physiotherapy/physiotherapy.component';
import { PsycologyComponent } from './psycology/psycology.component';

const routes: Routes= [
  {
    path:'selection',
    component:DoctorSelectionComponent
  },
  {
    path:'physiotherapy',
    component:PhysiotherapyComponent
  },
  {
    path:'psycology',
    component:PsycologyComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
