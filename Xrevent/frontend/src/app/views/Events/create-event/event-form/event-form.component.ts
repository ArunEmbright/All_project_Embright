import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from './event.service';
import { Router } from '@angular/router';
import { Event } from './event.model';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var M: any;

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  providers:[],
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  constructor( private taskService: EventService,private formBuilder:FormBuilder, private router: Router,@Inject(DOCUMENT) private _document: Document) { }
  ngOnInit(): void {
    
  }
  createList(
    exhibitor:string,
    organizer:string,
    eventName:string,
    startDate:string,
    endDate:string,
    location:string
    // img:File
    ) {
    
    this.taskService.createList( 
      exhibitor,
    organizer,
    eventName,
    startDate,
    endDate,
    location,
      ).subscribe((list: Event) => {
      console.log(list); 
      this.refreshPage();
    });
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
 
  }
