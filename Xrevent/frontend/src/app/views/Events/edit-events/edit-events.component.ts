import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event } from '../create-event/event-form/event.model';
import { EventService } from '../create-event/event-form/event.service';
@Component({
  selector: 'app-edit-Event',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss']
})
export class EditEventsComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: EventService, private router: Router,private formBuilder:FormBuilder) { }
  eventItem= Event;
  listId: string;
  lists: Event[];
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleEvent(this.listId)
        .subscribe((data)=>{
          this.eventItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'exhibitor':[this.eventItem.exhibitor,[Validators.required]],
       'organizer':[this.eventItem.organizer,[Validators.required]],
      'eventName':[this.eventItem.eventName,[Validators.required]],
      'startDate':[this.eventItem.startDate,[Validators.required]],
       'endDate':[this.eventItem.endDate,[Validators.required]],
       'location':[this.eventItem.location,[Validators.required]],
      
    })
  
  }

  updateList(
    exhibitor:string,
    organizer:string,
    eventName:string,
    startDate:string,
    endDate:string,
    location:string){
      this.taskService.updateList(this.listId, 
        exhibitor,
    organizer,
    eventName,
    startDate,
    endDate,
    location,).subscribe()
      this.router.navigate(['/events/list-events'])
    }

}
