import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Team } from '../model/team.model';
import { TeamService } from '../team-service/team.serveices';
import { ActivatedRoute, Params, Router } from '@angular/router';
declare var M: any;
@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.scss']
})
export class ListTeamComponent implements OnInit {

  lists: Team[];
 i:number=0;
  selectedListId: string;

  constructor(private taskService: TeamService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
         
        } 
      }
    )
    this.taskService.getLists().subscribe((lists: Team[]) => {
      this.lists = lists;
    })
    
  }
  deleteTeamFn(item:Team){
    if(confirm("Are you sure you want to delete")){
    for(this.i=0;this.i<this.lists.length;this.i++){
      if(item._id==this.lists[this.i]._id){
        this.lists.splice(this.i,1);
        console.log("success")
      }
    }
    this.taskService.deleteSingleTeam(item._id).subscribe(()=>{
    })
    console.log("big success")
    this.router.navigate(['/team/list-team']);
    
  }
  else{
    this.router.navigate(['/team/list-team']);
    console.log("failed");
  }
  }
}
