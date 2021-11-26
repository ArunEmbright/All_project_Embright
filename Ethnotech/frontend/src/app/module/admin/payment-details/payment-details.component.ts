import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/paymentDetails';
import { UserService } from 'src/app/service/user.service';
import { AuthAdminService } from 'src/app/guards/admin.guard'
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
payment:Payment[]
  constructor(private admin: AuthAdminService,private list: UserService) { }

  ngOnInit(): void {
    this.list.getPayment().subscribe((payment:Payment[]|any)=>{
      this.payment=payment
      //console.log(payment)
          })
  }
  onSubmit(){
    this.admin.signOut()
  }
}
