import { Component,Inject, OnInit } from '@angular/core';
import {AdminService} from '../../admin.service';
import {Activity} from '../activity.model'
import { DOCUMENT } from '@angular/common';
declare var M: any;
@Component({
  selector: 'app-autism',
  templateUrl: './autism.component.html',
  styleUrls: ['./autism.component.scss']
})
export class AutismComponent implements OnInit {

  constructor(private accountService: AdminService,@Inject(DOCUMENT) private _document: Document) { }
  activities:Activity[];
  activity:any[]=[]
  ngOnInit(): void {
    this.accountService.getActivity().subscribe((
      activities:Activity[]
    )=>{
      this.activities=activities;
     this.activity = this.activities
     console.table(this.activities)
    })
   
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }
  onDelete(_id:string){
    if(confirm('Are you sure to delete')==true){
      this.accountService.deleteActivity(_id).subscribe((res)=>{
        this.refreshPage();
       
        M.toast({html:'Deleted', classes:'rounded'})
      })
    }
  }
}
