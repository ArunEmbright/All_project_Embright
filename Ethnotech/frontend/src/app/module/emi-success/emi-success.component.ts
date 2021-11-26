import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emi-success',
  templateUrl: './emi-success.component.html',
  styleUrls: ['./emi-success.component.scss']
})
export class EmiSuccessComponent implements OnInit {
amount:any;
  constructor() { }

  ngOnInit(): void {
  
    this.amount =sessionStorage.getItem("amount") 
  }

}
