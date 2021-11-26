import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BookAppointmentRoutingModule } from './book-appointment-routing.module';
import { BookTherapistComponent } from './book-therapist/book-therapist.component';
import { BookingComponent } from './booking/booking.component';


@NgModule({
  declarations: [BookTherapistComponent, BookingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    BookAppointmentRoutingModule
  ]
})
export class BookAppointmentModule { }
