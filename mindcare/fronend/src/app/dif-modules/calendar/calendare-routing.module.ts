import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { EventListComponent } from './event-list/event-list.component';

const routes: Routes=[
  {
    path:'appointment',
    component:CalendarComponent
  },
  {
    path:'scheduled-list',
    component: EventListComponent
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CalendareRoutingModule { }
