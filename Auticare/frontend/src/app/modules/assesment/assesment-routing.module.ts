import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { PatientresultComponent } from './patientresult/patientresult.component';
import { SkillActivityComponent } from './skill-activity/skill-activity.component';
import { AssessmentComponent } from './extrea/assessment/assessment.component';
import { SkillContentComponent } from './skill-content/skill-content.component';


const routes: Routes = [
  
  {path:'', redirectTo:'child', pathMatch:'full'},
 
  {
    path: 'child',
    component: PatientDataComponent,
  },
   {
    path: 'result',
    component: PatientresultComponent,
  },
  {
    path:"assessment",
    component:AssessmentComponent
  },
  {
    path:"skill-Activity",
    component:SkillActivityComponent
  },
  {
    path:"skill-content",
    component:SkillContentComponent
  }

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssesmentRoutingModule { }
