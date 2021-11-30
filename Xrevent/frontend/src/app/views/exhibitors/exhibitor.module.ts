import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListExhibitorsComponent } from './list-exhibitors/list-exhibitors.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateExhibitorsComponent } from './create-exhibitors/create-exhibitors.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditExhibitorsComponent } from './edit-exhibitors/edit-exhibitors.component';

const roots: Routes=[
  {
    path:'',
    data: {
      title: 'Exhibitors'
    },
    children:[
      {
        path:'',
        redirectTo:'list-exhibitors',
        pathMatch:'full'
      },
      {
        path:'edit-exhibitor/:listId',
        component:EditExhibitorsComponent,
      },
      {
        path:'list-exhibitors',
        component:ListExhibitorsComponent,
        data:{
          title:'Exhibitor Lists'
        }
      },
      {
        path:'create-exhibitor',
        component:CreateExhibitorsComponent,
        data:{
          title:'Create Exhibitors'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListExhibitorsComponent,
    CreateExhibitorsComponent,
    EditExhibitorsComponent
  ],
  imports: [
    ModalModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(roots)
  ]
})
export class ExhibitorModule { }
