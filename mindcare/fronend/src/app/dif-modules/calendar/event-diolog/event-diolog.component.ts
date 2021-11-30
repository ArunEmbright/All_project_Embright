import { Component, OnInit,Inject,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CalendarService } from '../../../_services/calendar/calendar-services';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { PaymentService } from '../../../_services/payment-service.service';

export interface DialogData {
  date: '';
  time: '';
}

@Component({
  selector: 'app-event-diolog',
  templateUrl: './event-diolog.component.html',
  styleUrls: ['./event-diolog.component.scss']
})
export class EventDiologComponent implements OnInit {

  
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
        //  location.href = `${razor}`;
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
 
  eventData = {
    title: '',
    date: this.data.date,
    time: this.data.time,
  };

  constructor( private paymentService: PaymentService,private calendarService: CalendarService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<EventDiologComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  addEvent(form:any){
    if(form.valid){
      this.calendarService.addEvent(this.eventData)
      .subscribe((data )=>{
        this.snackBar.open('Added event!', '', { duration: 3000 });
          this.dialogRef.close({ event: 'add' });
      this.pay()
      },
      
      (error)=>{
        if (error.status == 404) {
          this.snackBar.open(error.statusText, '', { duration: 3000 });
          this.dialogRef.close({ event: '404' });
        } else {
          this.snackBar.open(' Something went wrong.', '', {
            duration: 3000,
          });
          this.dialogRef.close({ event: 'error' });
        }
      },
     
      )

    }
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
