import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import {Therapist} from '../../admin/therapist/therapist.model'
import { AuthService } from '../../auth/_services/auth.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-therapist-list',
  templateUrl: './therapist-list.component.html',
  styleUrls: ['./therapist-list.component.scss']
})
export class TherapistListComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  therapist: Therapist[];
  // doctors: any;
  // data: any;
  // dropDownItem: Array<String>;
  isLoading: boolean;
  patientName:string;
  age:Number;
  relationType:string;
  firstName:string;
  lastName:string;
  mobileNumber:string;
  email:string;
  userId:string;

  constructor(private auth:AdminService,private accountService:AuthService) {}
  users:User[];
  ngOnInit() {
    this.accountService.getUsers().subscribe(res=>{
      this.patientName = res[0].patientName
      this.age = res[0].age
      this.firstName = res[0].firstName
      this.lastName = res[0].lastName
      this.relationType = res[0].relationType
      this.mobileNumber = res[0].mobileNumber
      this.email = res[0].email
      this.userId = res[0].userId
      console.log(res[0])
      
    })
    this.auth.getDoctor().subscribe((therapist:Therapist[]
      )=>{
        this.therapist =therapist
        console.log(this.therapist)
      })
  
  
   

   
    console.log(this.therapist)
    
  }
 


searchFilter(e){
  const searchStr = e.target.value;
  this.therapist = this.therapist.filter(
  (doctor)=>{
    return doctor.location.toLowerCase().search(
      searchStr.toLowerCase())!==-1;
    
  });
}

custom(therapistId:string,therapistName:string,email:string,patientName:string,firstName:string,lastName:string,age:Number,userId:string,mobileNumber:string) {
  
  this.accountService.sessionBooking(therapistId,therapistName,email,patientName,firstName,lastName,age,userId,mobileNumber).subscribe((res)=>{
    Swal.fire({
      title: '<strong> Your Booking Confirmed! </strong>',
      icon: 'success',
     html:'<p> Our Team wiil contact you. Have a nice day!!!</p>',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      // confirmButtonText: '<i class="fa fa-thumbs-up"></i> Back to Home!',
      confirmButtonAriaLabel: 'Thumbs up, Back to Home',
      
    });
  })

  
}
}