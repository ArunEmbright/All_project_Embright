import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateSpeakersComponent } from './create-speakers/create-speakers.component';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';
import { ListSpeakersComponent } from './list-speakers/list-speakers.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Speaker'
    },
    children: [
      {
        path: '',
        redirectTo: 'list-speaker'
      },
      {
        path: 'list-speaker',
        component: ListSpeakersComponent,
        data: {
          title: 'List Speaker'
        }
      },
      {
        path:'CreateSpeaker',
        component:CreateSpeakersComponent,
        data:{
          title:'Create Speaker'
        }
        
      },
      {
        path:'edit-speaker/:listId',
        component:EditSpeakerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
