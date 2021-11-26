import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-therapy-booking',
  templateUrl: './therapy-booking.component.html',
  styleUrls: ['./therapy-booking.component.scss']
})
export class TherapyBookingComponent implements OnInit {

  constructor() { }

  @Input() transactions: Array<{
    id?: string;
    index?: number,
    name?: string,
    date?: string,
    total?: string,
    status?: string,
    payment?: string[],
  }>;
  ngOnInit(): void {
  }
  openModal(content: any) {
   
  }
}
