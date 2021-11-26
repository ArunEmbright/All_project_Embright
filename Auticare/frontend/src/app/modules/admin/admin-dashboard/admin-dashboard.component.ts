import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/_services/auth.service';
import { AdminService } from '../admin.service';
import { User } from 'src/app/core/models/auth.models';
import { Score } from '../../assesment/score.model';
import { Therapist } from '../therapist/therapist.model';
import { NumericValidator } from 'survey-angular';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  users:User[];
  scores:Score[];
  therapist: Therapist[];
  length:number
  assesment:any[]=[];
  user:any[]=[];
  doctor:any[]=[];
  FreeAppointment:any[]=[];
  institution:any=[]
  constructor(private accountService: AdminService) { }

  ngOnInit(): void {
   this.userDetail()
  this.Assessment()
  this.therapists()
  this.appointment()
  this.institute()
  }
  private userDetail(){
    this.accountService.getUser().subscribe((
      users:User[]
    )=>{
      this.users=users;
     this.user = this.users
    })
    
  }
  ngAfterViewInit() {
    setTimeout(() => {
      console.clear();
    }, 200);
  }
  private Assessment(){
    this.accountService.getScore().subscribe((scores:Score[]
      )=>{
     this.scores = scores
     this.assesment = this.scores
    })
   

  }
  private   therapists(){
    this.accountService.getDoctor().subscribe((therapist:Therapist[]
      )=>{
        this.therapist =therapist
        this.doctor = this.therapist
    
      })
  }
  private appointment(){
    this.accountService.getAppointment().subscribe((
      users:User[]
    )=>{
      this.users=users;
     this.FreeAppointment =this.users
    })
  }
  private institute(){
    this.accountService.getInstitution().subscribe((
      users:User[]
    )=>{
      this.users=users;
     this.institution =this.users
    })
  }
  
}
