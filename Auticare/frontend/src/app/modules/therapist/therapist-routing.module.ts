import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TherapistListComponent } from './therapist-list/therapist-list.component';
const routes: Routes = [
  {
    path: 'list',
    component: TherapistListComponent
  },
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TherapistRoutingModule { }
