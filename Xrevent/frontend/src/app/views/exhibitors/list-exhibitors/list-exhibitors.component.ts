import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExhibitorService } from '../create-exhibitors/exhibitor.service';
import { Exhibitor } from '../create-exhibitors/exhibitor.model';

declare var M: any;

@Component({
  selector: 'app-list-exhibitors',
  templateUrl: './list-exhibitors.component.html',
  styleUrls: ['./list-exhibitors.component.scss']
})
export class ListExhibitorsComponent implements OnInit {
  lists: Exhibitor[];
 i:number=0;
  selectedListId: string;


  constructor(private taskService: ExhibitorService, private route: ActivatedRoute, private router: Router) { }

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Exhibitor[]) => {
      this.lists = lists;
    })
    
  }

  deleteExhibitorFn(item:Exhibitor){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleExhibitor(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/exhibitor/list-exhibitors']);
    
  }
  else{
    this.router.navigate(['/exhibitor/list-exhibitors']);
    console.log("failed");
  }
  }
  
}
