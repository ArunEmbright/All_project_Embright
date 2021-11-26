import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AuthService } from "src/app/modules/auth/_services/auth.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminService } from '../../admin.service';
import Swal from 'sweetalert2';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {
menuForm : FormGroup;
SelectedAutism:string;
SelectedSkill:string 
selectedImage: ImageSnippet;
fileData:File
addVendorForm: any;
autismState: any = ['Mild', 'Moderate','Severe']
skillType: any = ['Daily Life','Self Care',"Cognitive ", 'Speech & Language',"Creativity & Imagination",'Sensory','behavioral', 
'Physical & Motor','Sensory','Pragmatic', 'Vocational','Social',]
  constructor(private auth: AdminService,private title: Title,
    private fb: FormBuilder,
    private location: Location, private http: HttpClient) { }

  ngOnInit(): void { 
    this.menuForm = this.fb.group({
      activityId:['auticare'+Math.floor(Math.random()*1000)],
      activityName: [null],
      typeOfAutism:[null],
      skillArea: [null],
      video: [null],
     
      //password:["Auticare@321"]
  })
  }
  fileUpload(doc: any) {
    const file: File = doc.files[0];
    this.fileData = file;
  
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedImage = new ImageSnippet(event.target.result, file); 
    });
    reader.readAsDataURL(file);
  }
  save() {
    var activityId = this.menuForm.value.activityId;
     var activityName = this.menuForm.value.activityName;
 
     var typeOfAutism = this.menuForm.value.typeOfAutism;
     var skillArea = this.menuForm.value.skillArea;
     //var password = this.menuForm.value.password;
     const formData = new FormData();
   
     formData.append('activityId', activityId)
     formData.append('activityName', activityName);
     formData.append('typeOfAutism', typeOfAutism);
     formData.append('skillArea', skillArea);
     //formData.append('password', password);
     formData.append('video', this.fileData);
   
     console.log("Form Data", formData)
   
     this.auth.uploadActivity(formData)
       this.isUploaded()
   }
   back() {
     this.location.back();
   }
   isUploaded(){
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'Activity Upload Successfully',
      showConfirmButton:false,
      timer:1500
    })
  }

}
