import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginComponent } from '../../login/login.component';
import { Profile } from './pofile-models/profile.model'
import { ProfileService } from './service/profile.service';

import { AuthService } from '../../../Main-Services/AuthService';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
editForm:FormGroup; 

constructor(private loginComponent: AuthService, private route: ActivatedRoute, private taskService: ProfileService, private router: Router,private formBuilder:FormBuilder) { }
profileItem = Profile;
ProfileList: Profile[];
listId:string;

  ngOnInit(): void {
    //     this.route.params.subscribe(
    //   (params: Params) =>{
    //    this.listId = this.loginComponent.selectedListId;
    //    console.log(this.loginComponent.selectedListId);
    //    this.taskService.getSingleUser(this.listId)
    //    .subscribe((data)=>{
    //      this.profileItem =JSON.parse(JSON.stringify(data));
    //      console.log("data",data)
         
    //    })

    //   }
    // )
    this.loginComponent.getUsers().subscribe((data)=>{
      this.profileItem =JSON.parse(JSON.stringify(data[0]));
          console.log("data",this.profileItem)
    })




    this.editForm =this.formBuilder.group({
      'firstName':[this.profileItem.firstName,[Validators.required]],
       'lastName':[this.profileItem.lastName,[Validators.required]],
      'phoneNumber':[this.profileItem.phoneNumber,[Validators.required]],
      'teamName':[this.profileItem.teamName,[Validators.required]],
       'location':[this.profileItem.location,[Validators.required]],
       'address':[this.profileItem.address,[Validators.required]],
       'email':[this.profileItem.email,[Validators.required]],
      
    })
    
  }

 
  updateUser(
    firstName: string, 
    lastName: string,
    phoneNumber: string,
    teamName: string,
    location: string,
    address: string,
    email: string,){
      this.taskService.updateUser(this.listId, 
        firstName ,
        lastName,
      phoneNumber,
      teamName,
      location,
      address,
      email
      ).subscribe()
      this.router.navigate(['/dashboard'])
    }
 

}
