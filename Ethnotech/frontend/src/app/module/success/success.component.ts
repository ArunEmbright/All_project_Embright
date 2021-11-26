import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  public state:any;
  _data:any;
  payment_id:any;
  _user:any;
  amount:any
  arr:any;
  data:any;
  constructor(private service:UserService) {
    this.payment_id =sessionStorage.getItem("key") 
    this.amount =sessionStorage.getItem("amount") 
   this.arr= sessionStorage.getItem('applicant_details') 

  }

  ngOnInit() {
    
    // console.log(this.data)
    //   this.service.confirmation(this.arr)
    
   
   
  } 
  // {"college":"Computer Science Engineering 2","name":"anoop","lastName":"anoop","registerNo":"","email":"arunlajayan@gmail.com","contact":"2582585","guardianFirstName":"","guardianEmail":"","department":"","year":"","paymentMode":"","guardianContact":"","lead_id":"","courseId":"","guardianLastName":"","loan_amount":""}
}
