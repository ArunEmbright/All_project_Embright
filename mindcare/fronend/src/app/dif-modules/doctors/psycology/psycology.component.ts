import { Component, OnInit } from '@angular/core';
import { TherapistModel } from 'src/app/_models/therapist-model';
import {psycologist} from './data'

@Component({
  selector: 'app-psycology',
  templateUrl: './psycology.component.html',
  styleUrls: ['./psycology.component.scss']
})
export class PsycologyComponent implements OnInit {

  psycologist:TherapistModel[];
  public therapist: TherapistModel[]=[];
  constructor() { }

  ngOnInit(): void {
    this.therapist = Object.assign([],psycologist );
  
  }

}
