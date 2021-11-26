import { Component, OnInit } from "@angular/core";
import { Therapist } from "../therapist.model";
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
  selector: "app-therapist-form",
  templateUrl: "./therapist-form.component.html",
  styleUrls: ["./therapist-form.component.scss"],
})
export class TherapistFormComponent implements OnInit {
  pageTitle = 'Auticare';
  menuForm: FormGroup;
  selectedImage: ImageSnippet;
  imagePreview: string;
  fileData: File;
  imageData: File;
selectedCar: string;

    cars = [{ id:'trivantrum' , name: 'Trivantrum' },{ id: 'kollam', name: 'Kollam' },{ id: 'kottayam', name: 'Kottayam' },{ id:'kochi', name: 'kochi' },];
  constructor(private auth: AdminService,private title: Title,
    private fb: FormBuilder,
    private location: Location, private http: HttpClient) {}

  ngOnInit(): void {
   
    this.menuForm = this.fb.group({
      therapistId:['auticare'+Math.floor(Math.random()*1000)],
      therapistName: [null],
      email:[null],
      experience: [null],
      specialization: [null],
      qualification: [null],
      location: [null],
      image: [null],
      doc:[null]
      //password:["Auticare@321"]
  })
}
get f() {
  return this.menuForm.controls;
}
public tags = [];

processImage(image: any) {
  const file: File = image.files[0];
  this.imageData = file;

  const reader = new FileReader();
  reader.addEventListener('load', (event: any) => {
    this.selectedImage = new ImageSnippet(event.target.result, file); 
  });
  reader.readAsDataURL(file);
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
 var therapistId = this.menuForm.value.therapistId;
  var therapistName = this.menuForm.value.therapistName;
  var email = this.menuForm.value.email;
  var specialization = this.menuForm.value.specialization;
  var experience = this.menuForm.value.experience;
  var qualification = this.menuForm.value.qualification;
  var location = this.menuForm.value.location;
  //var password = this.menuForm.value.password;
  const formData = new FormData();

  formData.append('therapistId', therapistId)
  formData.append('therapistName', therapistName);
  formData.append('email', email);
  formData.append('specialization',specialization);
  formData.append('experience', experience);
  formData.append('qualification', qualification);
  formData.append('location', location);
  //formData.append('password', password);
  formData.append('image', this.imageData);
  formData.append('doc', this.fileData);
  console.log("Form Data", formData)

  this.auth.uploadTherapist(formData)
    this.isUploaded()
}
back() {
  this.location.back();
}
isUploaded(){
  Swal.fire({
    position:'top-end',
    icon:'success',
    title:'Therapist Registration Successfully',
    showConfirmButton:false,
    timer:1500
  })
}
filter(){
  
}
}
