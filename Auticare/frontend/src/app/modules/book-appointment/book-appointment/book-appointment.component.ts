import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  relationship: any = ['Father', 'Mother','Siblings']
  constructor() { }

  ngOnInit(): void {
  }
  changeRelation(e) {
    console.log(e.target.value)
    
  }

}
