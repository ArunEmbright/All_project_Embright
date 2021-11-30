import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from './list-team/list-team.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamPhotoComponent } from './create-team/team-photo/team-photo.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditTeamComponent } from './edit-team/edit-team.component';

const roots: Routes=[
  {
    path:'',
    data:{
      title:'Team'
    },
    children:[
      {
        path:'',
        redirectTo:'list-team',
        pathMatch:'full'
        
      },
      {
        path:'list-team',
        component:ListTeamComponent,
        data:{
          title:'List-team'
        }
      },
      {
        path:'edit-team/:listId',
        component:EditTeamComponent,
      },
      {
        path:'create-team',
        component: CreateTeamComponent,
        data:{
          title:'Create-Team'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    
  ListTeamComponent,
  CreateTeamComponent,
  TeamPhotoComponent,
  EditTeamComponent

],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    RouterModule.forChild(roots)
  ]
})
export class TeamModule { }
