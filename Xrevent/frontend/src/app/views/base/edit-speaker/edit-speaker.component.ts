import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Speaker } from '../speaker-models/speaker.model';
import { SpeakerService } from '../speaker-services/speaker.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-speaker',
  templateUrl: './edit-speaker.component.html',
  styleUrls: ['./edit-speaker.component.scss']
})
export class EditSpeakerComponent implements OnInit {
  editForm:FormGroup;
  constructor(private route: ActivatedRoute, private taskService: SpeakerService, private router: Router,private formBuilder:FormBuilder) { }
  speakerItem= Speaker;
  listId: string;
  lists: Speaker[];
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.listId = params.listId;
        console.log(params.listId);
        this.taskService.getSingleSpeaker(this.listId)
        .subscribe((data)=>{
          this.speakerItem= JSON.parse(JSON.stringify(data));
          console.log(data);
      })   
      }
    )
    this.editForm =this.formBuilder.group({
      'title':[this.speakerItem.title,[Validators.required]],
       'firstName':[this.speakerItem.firstName,[Validators.required]],
      'phoneNumber':[this.speakerItem.phoneNumber,[Validators.required]],
      'company':[this.speakerItem.company,[Validators.required]],
       'designation':[this.speakerItem.designation,[Validators.required]],
      
    })
  
  }

  updateList(
    title: string, 
    firstName: string,
    phoneNumber: string,
    company: string,
    designation: string,){
      this.taskService.updateList(this.listId, 
        title ,
      firstName,
      phoneNumber,
      company,
      designation).subscribe()
      this.router.navigate(['/speaker/list-speaker'])
    }

}
