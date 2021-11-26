import { Component, Inject,OnInit } from '@angular/core';
import { Therapist } from '../therapist.model';
import { AdminService } from '../../admin.service';
import { DOCUMENT } from '@angular/common';

import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { DoctorService } from 'src/app/modules/doctor/doctor.service';
declare var M: any;
@Component({
  selector: 'app-therapist-details',
  templateUrl: './therapist-details.component.html',
  styleUrls: ['./therapist-details.component.scss']
})
export class TherapistDetailsComponent implements OnInit {
therapist: Therapist[];
  constructor(private auth:AdminService,private accountService:DoctorService,@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    this.auth.getDoctor().subscribe((therapist:Therapist[]
      )=>{
        this.therapist =therapist
        console.log(this.therapist)
      })
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
  onDelete(_id:string){
    if(confirm('Are you sure to delete')==true){
      this.accountService.deleteTherapist(_id).subscribe((res)=>{
        this.refreshPage();
       
        M.toast({html:'Deleted', classes:'rounded'})
      })
    }
  }

}
 