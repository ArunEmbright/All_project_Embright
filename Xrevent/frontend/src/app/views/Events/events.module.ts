import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListEventsComponent } from './list-events/list-events.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DxSchedulerModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { EventPhotoService } from './create-event/evet-service/event-photo.service';
import { CoverPhotoComponent } from './cover-photo/cover-photo.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { EventFormComponent } from './create-event/event-form/event-form.component';
import { EventService } from './create-event/event-form/event.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditEventsComponent } from './edit-events/edit-events.component';

const roots: Routes=[
  {
    path:'',
    data:{
      title:"Events"
    },
    children:[
    
      {
        path:'',
        redirectTo:'list-events',
        pathMatch:'full'

      },
      {
        path:'edit-event/:listId',
        component:EditEventsComponent,
      },
      { 
        data:{
          title:'List Events'
        },
        path:'list-events',
        component: ListEventsComponent
      },
      {
        data:{
          title:'Create Events'
        },
        path:'create-events',
        component:CreateEventComponent
      },
      {
        data:{
          title:'My Events'
        },
        path:'my-events',
        component:MyEventsComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListEventsComponent,
    CreateEventComponent,
    MyEventsComponent,
    CoverPhotoComponent,
    EventFormComponent,
    EditEventsComponent
  ],
  imports: [
    CommonModule,
    ScheduleModule,
    NgbModule,
    AngularEditorModule,
    FormsModule,   
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
     ModalModule,
    ReactiveFormsModule,
     NgbNavModule,
     NgbDropdownModule,
     NgbTooltipModule ,
     DxSchedulerModule,
     HttpClientModule,
    RouterModule.forChild(roots)
  ],
  providers:[EventPhotoService, EventService]
})
export class EventsModule { 
  
}
