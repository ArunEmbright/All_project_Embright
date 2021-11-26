import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http"
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/auth.models';
@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {
  users:User[];
  name: string;
  patientForm: FormGroup;
  age: number;
  submitted = false;
  error = '';
  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    
    this.patientForm = this.formBuilder.group({
      age:['', [Validators.required]],
      patientName: ['', [Validators.required]],
      
      dob: ['', [Validators.required]],
      
    });
  }


  get f() { return this.patientForm.controls; }

  getAge(dob){
    var date = new Date(dob)
    var newDate = new Date()
    // var DiffOfYear = newDate.getTime() - date.getTime()
    // var DiffOfDays = DiffOfYear/(1000 * 3600 * 24)
    // this.age=(Math.round(DiffOfDays/360)-1);
    // console.log(this.age);
    let timeDiff = Math.abs(newDate.getTime() - date.getTime());
     this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log(this.age)
  }
 onSubmit(){
   
  this.submitted = true;

    // stop here if form is invalid
    if (this.patientForm.invalid) {
      return;
    } else {      
       localStorage.setItem('patient', JSON.stringify(this.patientForm.value));
       
       this.router.navigate(['/auth/signup']);
    }
  }

    
}
