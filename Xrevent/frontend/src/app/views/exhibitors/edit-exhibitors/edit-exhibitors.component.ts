import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exhibitor } from '../create-exhibitors/exhibitor.model';
import { ExhibitorService } from '../create-exhibitors/exhibitor.service';

@Component({
  selector: 'app-edit-exhibitor',
  templateUrl: './edit-exhibitors.component.html',
  styleUrls: ['./edit-exhibitors.component.scss']
})
export class EditExhibitorsComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: ExhibitorService, private router: Router,private formBuilder:FormBuilder) { }
  exhibitorItem= Exhibitor;
  listId: string;
  lists: Exhibitor[];
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleExhibitor(this.listId)
        .subscribe((data)=>{
          this.exhibitorItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'events':[this.exhibitorItem.events,[Validators.required]],
       'firstName':[this.exhibitorItem.firstName,[Validators.required]],
      'lastName':[this.exhibitorItem.lastName,[Validators.required]],
      'startDate':[this.exhibitorItem.startDate,[Validators.required]],
       'endDate':[this.exhibitorItem.endDate,[Validators.required]],
       'exhibitorTags':[this.exhibitorItem.exhibitorTags,[Validators.required]],
       'companyName':[this.exhibitorItem.companyName,[Validators.required]],
      'email':[this.exhibitorItem.email,[Validators.required]],
       'phoneNumber':[this.exhibitorItem.phoneNumber,[Validators.required]],
      
    })
  
  }

  updateList(
    events:string,
    firstName:string, 
    lastName: string,
    startDate: string,
    endDate:string,
    exhibitorTags:string,
    companyName: string,
    email: string,
    phoneNumber:number){
      this.taskService.updateList(this.listId, 
        events,
        firstName,
        lastName,
        startDate,
        endDate,
        exhibitorTags,
        companyName,
        email,
        phoneNumber,).subscribe()
      this.router.navigate(['/exhibitor/list-exhibitors'])
    }

}
