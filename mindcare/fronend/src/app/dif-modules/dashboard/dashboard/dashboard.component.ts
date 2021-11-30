
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { endOfDay, isPast, isToday, startOfDay } from 'date-fns';
import { isFuture } from 'date-fns/esm';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CalendarService } from 'src/app/_services/calendar/calendar-services';
import { PaymentService } from 'src/app/_services/payment-service.service';
import { environment } from '../../../../environments/environment';

const razor = `${environment.razorPay}`

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
 
  @ViewChild('modal') public modalPopup: ModalDirective;
  rzp1;
  options = {
    "key": "rzp_live_9AnvOFdW5Q7jpD", // Enter the Key ID generated from the Dashboard
    "amount": "500", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Mindcare",
    "description": "Consultation",
    "image": "assets/img/2hUnzH.jpg",
    "order_id": "", //This is a sample Order ID. Pass the 
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // // alert(response.razorpay_order_id);
        // // callback_url: 'https://your-server/callback_url',
        if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id ) {
         location.href = `${razor}`;
        } else {
          alert('invalid')
        }
        
    },
    "prefill": {
        "name": "Mindcare",
        "email": "mail@embrightinfotech.com",
        "contact": "7306701712"
    },
    "notes": {
        "address": "Embright-infotech"
    },
    "theme": {
        "color": "#3399cc"
    }
};
 
  constructor(private paymentService: PaymentService
    , private router: Router,
    ) { }

  ngOnInit(): void {
    
  }
 
  pay(){
  this.options.amount="600"
  this.rzp1 = new this.paymentService.nativeWindow.Razorpay(this.options);
  this.rzp1.open();
 this.modalPopup.hide()
 }

 paymentModalPopup(){
   this.modalPopup.show();
 }
  
 
}

