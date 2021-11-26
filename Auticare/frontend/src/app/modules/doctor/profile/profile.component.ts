import { Component, OnInit } from '@angular/core';
import { Therapist } from '../../admin/therapist/therapist.model';
import { DoctorService } from '../doctor.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
therapist : Therapist[]
  constructor(private accountService:DoctorService) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe((
      therapist:Therapist[]
    )=>{
      this.therapist=therapist;
      console.log(therapist)
    })
  }

}
