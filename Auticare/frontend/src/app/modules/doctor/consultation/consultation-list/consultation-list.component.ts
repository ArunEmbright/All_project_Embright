import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../doctor.service';
import { SessionBooking } from '../../SessionBooking.model'
@Component({
  selector: 'app-consultation-list',
  templateUrl: './consultation-list.component.html',
  styleUrls: ['./consultation-list.component.scss']
})
export class ConsultationListComponent implements OnInit {
scores:SessionBooking[]
assesment:[];
  constructor(private accountService:DoctorService) { }

  ngOnInit(): void {
    this.accountService.getSessionBooking().subscribe((scores:SessionBooking[]
      )=>{
     this.scores = scores
     
     console.log(this.scores)
    })
  }

}


