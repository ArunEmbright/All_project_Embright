import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
declare var $: any;
@Component({
  selector: 'app-emi',
  templateUrl: './emi.component.html',
  styleUrls: ['./emi.component.scss']
})
export class EmiComponent implements OnInit {
  EmiForm:FormGroup;
 year:any;
 time:any;
 Year:any;
 user:any;
 rate:any;
 _user:any;
 data:any;
  process: boolean;
  U: UserModel = new UserModel('','','','','','','','','','','','','','','',''  );
  constructor(private service: UserService) { 
    this._user = JSON.parse(sessionStorage.getItem('applicant_details') || '{}');
    this.data ={"college_id":this._user.college,"course_id":this._user.department,"location_id":this._user.location, "first_name":this._user.name,"last_name":this._user.lastName,"mobile":this._user.contact,"email":this._user.email,}
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  SelectedMonth(event: any) {
    this.year = event.target.value
    if (this.year == '1') {
      this.time = 1;
      this.rate = "13000";
    }
    if (this.year == '2') {
      this.time = 2;
      this.rate = "26000";
    }
    sessionStorage.setItem("amount", JSON.stringify(this.rate));
    
  }
  submit(){
 //console.log(this.rate)
    if (this.rate !==undefined) {
      this.process = true;

      const formData = new FormData();

      formData.append('emi', this.time);


      // if (this.currentType == 'update') {
        formData.append('registration_id', '6');
      // }
this.service.postEMI(formData)
this.service.submitPayment(this.data,this.rate)
     //console.log("success")
    } else {
     //console.log("error happened")
    }
  }

}
