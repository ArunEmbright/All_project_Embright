import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Speaker } from '../speaker-models/speaker.model';
import { SpeakerService } from '../speaker-services/speaker.service';

declare var M: any;
@Component({
  selector: 'app-list-speakers',
  templateUrl: './list-speakers.component.html',
  styleUrls: ['./list-speakers.component.scss']
})
export class ListSpeakersComponent implements OnInit {
  lists: Speaker[];
 i:number=0;
  selectedListId: string;
  constructor(private taskService: SpeakerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Speaker[]) => {
      this.lists = lists;
    })
    
  }
  // onDeleteListClick() {
  //   this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
  //     this.router.navigate(['/speaker/list-speaker']);
  //     console.log(res);
  //   })
  // }
  deleteSpeakerfn(item:Speaker){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleSpeaker(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/speaker/list-speaker']);
    
  }
  else{
    this.router.navigate(['/speaker/list-speaker']);
    console.log("failed");
  }
  }
}
