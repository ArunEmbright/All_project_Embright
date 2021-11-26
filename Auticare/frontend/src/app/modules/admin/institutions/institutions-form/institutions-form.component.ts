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
  selector: 'app-institutions-form',
  templateUrl: './institutions-form.component.html',
  styleUrls: ['./institutions-form.component.scss']
})

export class InstitutionsFormComponent implements OnInit {

  pageTitle = 'Auticare';
  menuForm: FormGroup;
  selectedImage: ImageSnippet;

  fileData: File;
  imageData: File;
selectedCar: string;

  
  constructor(private auth: AdminService,private title: Title,
    private fb: FormBuilder,
    private location: Location, private http: HttpClient) {}

  ngOnInit(): void {
   
    this.menuForm = this.fb.group({
      InstitutionId:['auticare'+Math.floor(Math.random()*1000)],
      institutionName: [null],
      email:[null],
      registeredAddress: [null],
      contact: [null],
      GST: [null],
      dob: [null],
      regDoc: [null],
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
 var InstitutionId = this.menuForm.value.InstitutionId;
  var institutionName = this.menuForm.value.institutionName;
  var email = this.menuForm.value.email;
  var contact = this.menuForm.value.contact;
  var registeredAddress = this.menuForm.value.registeredAddress;
  var GST = this.menuForm.value.GST;
  var dob = this.menuForm.value.dob;
  //var password = this.menuForm.value.password;
  const formData = new FormData();

  formData.append('InstitutionId', InstitutionId)
  formData.append('institutionName', institutionName);
  formData.append('email', email);
  formData.append('contact',contact);
  formData.append('registeredAddress', registeredAddress);
  formData.append('GST', GST);
  formData.append('dob', dob);
  //formData.append('password', password);
  formData.append('regDoc', this.imageData);
  formData.append('doc', this.fileData);
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
    title:'Institution Registration Successfully',
    showConfirmButton:false,
    timer:1500
  })
}
filter(){
  
}
}
