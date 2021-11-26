import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from './dashboard.model';
import { emailSentBarChart, monthlyEarningChart, transactions, statData } from './data';
import { AuthService } from '../../auth/_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions;
  statData;
  patientName:string;
  age:Number;
  relationType:string;
  firstName:string;
  lastName:string;
  mobileNumber:number;
  email:string;
  userId:string;
  
  @ViewChild('content') content;
  constructor(private modalService: NgbModal,private auth: AuthService) { }

  ngOnInit() {
    this.auth.getUsers().subscribe(res=>{
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
    /**
     * Fetches the data
     */
    this.fetchData();
  }
  ngAfterViewInit() {
    setTimeout(() => {
      // this.openModal();
    }, 2000);
  }
  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;
    this.transactions = transactions;
    this.statData = statData;
  }
  openModal() {
    this.modalService.open(this.content, { centered: true });
  } 

  custom(email:string,patientName:string,firstName:string,lastName:string,relationType:string,age:Number,userId:string) {
  this.auth.bookAppointment(email,patientName,firstName,lastName,relationType,age,userId).subscribe((res)=>{
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


