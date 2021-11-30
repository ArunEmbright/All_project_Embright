import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../settings/profile.service';
import { Team } from '../model/team.model';
import { TeamService } from '../team-service/team.serveices';
import { DOCUMENT } from '@angular/common';
declare var M: any;
@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
 
  constructor( private taskService: TeamService,private formBuilder:FormBuilder, private router: Router,@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    
  }
  createList(
    exhibitor: string,
    firstName:string,
    lastName:string,
    email: string,
    phoneNumber:string,
    designation: string
    // img:File
    ) {
    
    this.taskService.createList( 
      exhibitor,
      firstName,
      lastName,
      email,
      phoneNumber,
      designation
      ).subscribe((list: Team) => {
      console.log(list);
      this.refreshPage(); 
    });
   
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
}
