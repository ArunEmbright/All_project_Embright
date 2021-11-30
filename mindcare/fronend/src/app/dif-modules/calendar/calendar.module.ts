import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendareRoutingModule } from './calendare-routing.module';
import {  CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatDialogModule } from '@angular/material/dialog';
import { EventDiologComponent } from './event-diolog/event-diolog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from './calendar/calendar.component';
import { EventListComponent } from './event-list/event-list.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { KeyValuePipe, KeyValuePipeReversed } from 'src/app/_pipe/piped-values';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    CalendarComponent,
    EventDiologComponent,
    EventListComponent,
    KeyValuePipeReversed,
    KeyValuePipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    CalendareRoutingModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    ModalModule,
    MatSnackBarModule,
      CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class CalendarModules { }
