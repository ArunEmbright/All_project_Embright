import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SpeakerService } from '../speaker-services/speaker.service';
import { Router } from '@angular/router';
import { Speaker } from '../speaker-models/speaker.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from "../../settings/Profile"
import { SpeakerStorageService } from './speaker-storage.service';
import { DOCUMENT } from '@angular/common';
declare var M: any;

@Component({
  selector: 'app-create-speakers',
  providers:[],
  templateUrl: './create-speakers.component.html',
  styleUrls: ['./create-speakers.component.css']
})
export class CreateSpeakersComponent implements OnInit {
  addForm:FormGroup;
  imageData=null;
  Speakers: Speaker[] = [];
  constructor(private storageService: SpeakerStorageService,private taskService: SpeakerService,private formBuilder:FormBuilder, private router: Router,@Inject(DOCUMENT) private _document: Document) { }

   speakerItem =new Speaker
  ngOnInit(): void {
    this.addForm =this.formBuilder.group({
      img:[this.speakerItem.img,[Validators.required]],
    })
    }
    upload(event){
      console.log(event);
      this.imageData=event.target.files[0]
  
    }
    onFileSelect(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.addForm.patchValue({ image: file });
      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (file && allowedMimeTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }
    onImageSubmit(){
      
      this.storageService.newImage(this.addForm.value.name,this.addForm.value.image)
      // console.log(this.speakerItem, this.imageData)
      //  this.addForm.get('img').setValue(this.imageData)
      this.addForm.reset();
       this.imageData= null;
      
      
    }
    onDelete(){
      this.storageService.deleteImage(this.speakerItem._id);
     
    }

  createList(title: string,
    firstName: string,
    phoneNumber: string,
    company: string,
    designation:string,
    // img:File
    ) {
    
    this.taskService.createList( 
      title ,
      firstName,
      phoneNumber,
      company,
      designation
      // img
      ).subscribe((list: Speaker) => {
      console.log(list); 
      this.refreshPage();
    });
  }
  refreshPage(){
    this._document.defaultView.location.reload();
  }

}