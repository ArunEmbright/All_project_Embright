import { Component, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { TeamService } from '../team-service/team.serveices';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: TeamService, private router: Router,private formBuilder:FormBuilder) { }

  teamItem= Team;
  listId: string;
  lists: Team[];
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleTeam(this.listId)
        .subscribe((data)=>{
          this.teamItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'exhibitor':[this.teamItem.exhibitor,[Validators.required]],
       'firstName':[this.teamItem.firstName,[Validators.required]],
      'lastName':[this.teamItem.lastName,[Validators.required]],
      'email':[this.teamItem.email,[Validators.required]],
       'phoneNumber':[this.teamItem.phoneNumber,[Validators.required]],
       'designation':[this.teamItem.designation,[Validators.required]],
      
    })
  
  }

  updateList(
    events:string,
    firstName:string, 
    lastName: string,
    email: string,
    phoneNumber:string,
    designation:string){
      this.taskService.updateList(this.listId, 
        events,
        firstName,
        lastName,
        email,
        phoneNumber,
        designation).subscribe()
      this.router.navigate(['/team/list-team'])
    }


}
