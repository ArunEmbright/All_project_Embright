// Angular
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';
import { ListSpeakersComponent } from './list-speakers/list-speakers.component';
import { CreateSpeakersComponent } from './create-speakers/create-speakers.component';
import { HttpClientModule } from '@angular/common/http';
import { EditSpeakerComponent } from './edit-speaker/edit-speaker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseRoutingModule,
    HttpClientModule,
    ModalModule
  ],
  declarations: [
    ListSpeakersComponent,
    CreateSpeakersComponent,
    EditSpeakerComponent
  ],
  providers:[]
})
export class BaseModule { }
