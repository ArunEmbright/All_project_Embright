import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-add-college',
  templateUrl: './add-college.component.html',
  styleUrls: ['./add-college.component.scss']
})
export class AddCollegeComponent implements OnInit {
  addCollege: FormGroup;
  selectedCar: string;
  college = [{ id:'trivantrum' , name: 'Trivantrum' },{ id: 'kollam', name: 'Kollam' },{ id: 'kottayam', name: 'Kottayam' },{ id:'kochi', name: 'kochi' },];
  items = ['Pizza', 'Pasta', 'Parmesan'];
  constructor( private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService) { }

  ngOnInit(): void {
    this.addCollege = this.formBuilder.group({
  
      location: ['', [Validators.required]],
      college: ['', [Validators.required]],
  
    });
  }  
  onSubmit(){
    if (this.addCollege.valid) {
      //console.log(this.addCollege.value)
   this.user.postCollege(this.addCollege.value).subscribe((data) => { });
    }

  }
}
