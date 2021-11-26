import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Score } from '../../assesment/score.model';
@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  scores:Score[];
  assesment:number;
  constructor(private accountService:DoctorService) { }

  ngOnInit(): void {
    this.Assessment()
  }
  private Assessment(){
    this.accountService.getSessionBooking().subscribe((scores:Score[]
      )=>{
     this.scores = scores
     this.assesment = this.scores.length
     console.log(this.assesment)
    })
   

  }
}
