import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ExhibitorService } from './exhibitor.service';
import { Router } from '@angular/router';
import { Exhibitor } from './exhibitor.model';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
declare var M: any;



@Component({
  selector: 'app-create-exhibitors',
  templateUrl: './create-exhibitors.component.html',
  providers:[ExhibitorService],
  styleUrls: ['./create-exhibitors.component.scss']
})
export class CreateExhibitorsComponent implements OnInit {



  constructor( private taskService: ExhibitorService,private formBuilder:FormBuilder, private router: Router,@Inject(DOCUMENT) private _document: Document) { }
  ngOnInit(): void {
    
  }
  createList(
    events:string,
    firstName:string, 
    lastName: string,
    startDate: string,
    endDate:string,
    exhibitorTags:string,
    companyName: string,
    email: string,
    phoneNumber:number
    // img:File
    ) {
    
    this.taskService.createList( 
      events,
      firstName,
      lastName,
      startDate,
      endDate,
      exhibitorTags,
      companyName,
      email,
      phoneNumber,
      ).subscribe((list: Exhibitor) => {
      console.log(list); 
      this.refreshPage();
    });
    
    
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
}
