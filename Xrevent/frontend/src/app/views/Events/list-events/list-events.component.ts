import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { EventService  } from "../create-event/event-form/event.service";
import {Event  } from "../create-event/event-form/event.model";
import { ActivatedRoute, Params, Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss']
})
export class ListEventsComponent implements OnInit {
  lists: Event[];
 i:number=0;
  selectedListId: string;


  constructor(private taskService: EventService, private route: ActivatedRoute, private router: Router) { }

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Event[]) => {
      this.lists = lists;
    })
    
  }

  deleteEventFn(item:Event){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleEvent(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/events/list-events']);
    
  }
  else{
    this.router.navigate(['/events/list-events']);
    console.log("failed");
  }
  }
  
}
