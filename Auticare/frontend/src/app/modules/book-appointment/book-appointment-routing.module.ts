import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { BookTherapistComponent } from './book-therapist/book-therapist.component';
import { BookingComponent } from './booking/booking.component';
const routes: Routes = [
  {
    path:'addChild',
    component: BookAppointmentComponent
  },
  {
    path:'addTherapist',
    component: BookTherapistComponent
  },
  {
    path:'booking',
    component: BookingComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookAppointmentRoutingModule { }
