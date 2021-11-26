import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaymentService } from 'src/app/service/payment.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
const razor = `${environment.razorPay}`
import { CourseDetailsModel } from 'src/app/model/course_details.model';


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  
  @ViewChild('modal') public modalPopup: ModalDirective;
  public courseData: CourseDetailsModel = new CourseDetailsModel('', '', '', '');
  subscribeForm: FormGroup;
rzp1:any;
Rate:string;
_user:any;
data:any;
year:any;

 razorpay_payment_id:any;
 razorpay_order_id:any;



  constructor(private paymentService: PaymentService, private router: Router,private service: UserService,private formBuilder: FormBuilder,public http: HttpClient,) { 
    this._user = JSON.parse(sessionStorage.getItem('applicant_details') || '{}');
this.data ={ "first_name":this._user.name,"email":this._user.email,"mobile":this._user.contact}
  }
  options = {
    "key": "rzp_test_Lvq7SPVYxaYQ5Z", // Enter the Key ID generated from the Dashboard
    "amount": "130000",
    "actualPay":'', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Ethnotech",
    "description": "Consultation",
    "image": "assets/images/media/logo2.png",
    "order_id": "", //This is a sample Order ID. Pass the 
    "handler":    (response:any) => {
      sessionStorage.setItem("key", JSON.stringify(response.razorpay_payment_id));
      this.service.confirmation(this.data)
   this.service.createOrder(response,this.data,this.options.actualPay).subscribe((data) => { });
       alert(`Your payment id :${response.razorpay_payment_id}`);
  
        //  //console.log("order id",response.razorpay_order_id);
        // // callback_url: 'https://your-server/callback_url',
        
        if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id ) {
         location.href = '/#/Success' 
        } else {
          alert('invalid')
        }
        
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "notes": {
        "address": "contactus@ethnotech.in"
    },
    "theme": {
        "color": "#3399cc"
    }
  };
  ngOnInit(): void {
  
  }
  public payable(){

  }
Paynow(){
  console.log(this.data)
// this.service.getOrderID(this.subscribeForm.value).subscribe((data) => {
//   //console.log(data)
//  });

this.options.prefill.email = this.data.email;
this.options.prefill.contact = this.data.mobile;
  if(this.year =='1'){
    this.options.amount="1300000"
  
    this.options.actualPay ="13000"
    this.rzp1 = new this.paymentService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
    
    
  }
  if(this.year =='2'){
    
    this.options.amount="2600000"
    this.options.actualPay ="26000"
    this.rzp1 = new this.paymentService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
   
   
  }
  sessionStorage.setItem("amount", JSON.stringify(this.options.actualPay));
  
}

SelectedYear1(event:any){

  this.year = event.target.value
  if(this.year =='1'){
    this.Rate ='13000'
  }
  if(this.year =='2'){
    this.Rate ='26000'
  }


}
}
