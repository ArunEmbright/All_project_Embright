import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import {UserScoreComponent} from './user-score/user-score.component'
import { FreeAppointmentComponent } from './appointment/free-appointment/free-appointment.component';
import { TherapistDetailsComponent } from './therapist/therapist-details/therapist-details.component'
import { TherapistFormComponent } from './therapist/therapist-form/therapist-form.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { TherapySessionComponent } from './appointment/therapy-session/therapy-session.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { TherapyBookingComponent } from './appointment/therapy-booking/therapy-booking.component';
import { SessionBookingComponent } from './booking/session-booking/session-booking.component';
import { EditTherapistComponent } from './therapist/edit-therapist/edit-therapist.component';
import { InstitutionsFormComponent } from "./institutions/institutions-form/institutions-form.component";
import { AutismComponent } from "./Skill-training-pack/autism/autism.component";
import { AddActivityComponent } from './Skill-training-pack/add-activity/add-activity.component';
import { EditActivityComponent } from "./Skill-training-pack/edit-activity/edit-activity.component";

const routes: Routes = [
  
  {path:'', redirectTo:'dashboard', pathMatch:'full'},

  {
    path: 'dashboard',
    component: AdminDashboardComponent,
  },
  {
    path: 'therapy-booking',
    component: TherapyBookingComponent,
  },
  {
    path: 'users',
    component: UserDetailComponent,
  },
  {
    path: 'add-institution',
    component: InstitutionsFormComponent,
  },
  {
    path: 'score',
    component: UserScoreComponent,
  },
  {
    path: 'appointment',
    component: FreeAppointmentComponent,
  },
  {
    path: 'therapist-details',
    component: TherapistDetailsComponent,
  },
  {
    path: 'therapist-form',
    component: TherapistFormComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },{
    path: 'therapy-session',
    component: TherapySessionComponent,
  },{
    path: 'edit-user/:userId',
    component: EditUserComponent,
  },
  {
    path: 'edit-therapist/:userId',
    component: EditTherapistComponent,
  },
  {
    path: 'autism-pack',
    component: AutismComponent,
  },
  {
    path: 'book-session',
    component: SessionBookingComponent,
  },
  {
    path: 'add-activity',
    component: AddActivityComponent,
  },
  {
    path: 'edit-activity/:userId',
    component: EditActivityComponent,
  }
  

  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
 