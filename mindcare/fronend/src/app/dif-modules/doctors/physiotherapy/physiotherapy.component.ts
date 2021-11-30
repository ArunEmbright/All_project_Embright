import { Component, OnInit } from '@angular/core';
import { TherapistModel } from 'src/app/_models/therapist-model';
import {physiotherapy} from './data'

@Component({
  selector: 'app-physiotherapy',
  templateUrl: './physiotherapy.component.html',
  styleUrls: ['./physiotherapy.component.scss']
})
export class PhysiotherapyComponent implements OnInit {

  physiotherapy: TherapistModel[]; 
  physiotherapist: TherapistModel[]=[]
  constructor() { }

  ngOnInit(): void {
    this.physiotherapist = Object.assign([],physiotherapy)
  }

}
