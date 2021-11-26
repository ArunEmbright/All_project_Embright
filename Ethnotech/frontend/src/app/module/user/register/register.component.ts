import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { College } from 'src/app/model/college';
import Swal from 'sweetalert2';
import { first,map } from 'rxjs/operators';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup;
  collegeValue: any;
  serverErrorMessages: string;
  error = null;
  submitted = false;
  event: any;
  collegeName:string;
  courseName:string;
  Location = [
    { id: 1, name: 'Mysore' },
    { id: 2, name: 'Thandavapura' },
    { id: 3, name: 'Tumkur' },
    { id: 4, name: 'Bangalore' },
    { id: 5, name: 'Davanagere' },
    { id: 6, name: 'Himachal Pradesh' },
    { id: 7, name: 'Mangalore' },

    { id: 8, name: 'Chitradurga' },
    { id: 9, name: 'Bhopal' },
    { id: 10, name: 'Shivamogga' },
  ];

  public college: any = [
    { id: 1, name: ' Maharaja Institute of Technology', collegeID: 1 },
    {
      id: 2,
      name: 'Maharaja Institute of Technology Thandavapura ',
      collegeID: 2,
    },
    {
      id: 3,
      name: 'GSSS Institute of Engineering and Technology for Women Mysore',
      collegeID: 1,
    },
    { id: 4, name: "St. Philomena's College Mysore", collegeID: 1 },
    { id: 5, name: 'Sri Siddhartha Institute of Technology', collegeID: 1 },
    { id: 6, name: 'Yenepoya Institute of Technology', collegeID: 1 },
    { id: 7, name: 'Sri Siddhartha Institute of Technology', collegeID: 3 },
    { id: 8, name: 'AMC College of Engineering', collegeID: 4 },
    { id: 9, name: 'Jyothy Institute of Technology', collegeID: 4 },
    { id: 10, name: 'Bangalore Institute of Technology', collegeID: 4 },
    { id: 11, name: 'Nitte Meenakshi Institute of Technology', collegeID: 4 },
    { id: 12, name: 'Srinivas University', collegeID: 7 },
    {
      id: 13,
      name: 'Sahyadri College of Engineering & Management',
      collegeID: 7,
    },
    { id: 14, name: 'Yenepoya Institute of Technology', collegeID: 7 },
    {
      id: 15,
      name: 'Bapuji Institute of Engineering & Technology',
      collegeID: 5,
    },
    { id: 16, name: 'Jain Institute of Technology', collegeID: 5 },
    {
      id: 17,
      name: 'Sri Jagadguru Murugharajendra Institute of Technology',
      collegeID: 8,
    },
    {
      id: 18,
      name: 'GSSS Institute of Engineering & Technology for women',
      collegeID: 13,
    },
    { id: 19, name: 'Dr. Ambedkar Institute of Technology', collegeID: 4 },

    { id: 20, name: 'BMS College of engineering', collegeID: 4 },
    { id: 21, name: 'REVA University', collegeID: 4 },
    { id: 22, name: 'East West Institute of Technology', collegeID: 4 },
    { id: 23, name: 'Don Bosco Institute of Technology', collegeID: 4 },
    { id: 24, name: 'Maharaja Institute of Technology', collegeID: 1 },
    { id: 25, name: 'T.John Institute of Technology', collegeID: 4 },
    { id: 26, name: 'Shreedevi Institute of Technology', collegeID: 7 },
    {
      id: 27,
      name: 'Alvas Institute of Engineering & Technology',
      collegeID: 7,
    },
    { id: 28, name: 'Bahra University', collegeID: 6 },
    { id: 29, name: 'Millenium Group of Institutions', collegeID: 9 },
    { id: 30, name: 'RV College of Engineering', collegeID: 4 },
    {
      id: 31,
      name: 'Jawaharlal Nehru National College of Engineering',
      collegeID: 10,
    },
    { id: 32, name: 'PESIT- Shivamogga', collegeID: 10 },
  ];
  department: any = [
    { id: 1, name: 'Computer Science Engineering ', departmentID: 'second year'},
    { id: 2, name: 'Computer Science Engineering', departmentID: 'Third year' },
    { id: 3, name: 'Information Science Engineering ', departmentID: 'second year' },
    { id: 4, name: 'Information Science Engineering', departmentID: 'Third year' },
    {
      id: 5,
      name: 'Electronics and Communication Engineering ',
      departmentID: 'second year',
    },
    {
      id: 6,
      name: 'Electronics and Communication Engineering',
      departmentID: 'Third year',
    },
    { id: 7, name: 'Civil Engineering ', departmentID: 'second year'},
    { id: 8, name: 'Civil Engineering', departmentID: 'Third year' },
    { id: 9, name: 'Mechanical Engineering ', departmentID: 'second year' },
    { id: 10, name: 'Mechanical Engineering', departmentID: 'Third year' },
  ];
  year: any = [
    { id: 'second year', name: 'second year' },
    { id: 'Third year', name: 'Third year' },
  ];
  paymentMode: any = [
    'Credit Card',
    'Debit Card',
    'UPI',
    'NetBanking',
    'No-cost EMI',
    'UPI',
  ];
  public listCollegeDropdownData = [];
  public listDepartment = [];
  departmentID: string;
  collegeID: number;
  location: string;
  selectCourse:any;
  U: UserModel = new UserModel('','','','','','','','','','','','','','','','');
  collegeListDrop: any[];
  _user:any;
  selectCollege:any;
  selectedLocation:any;
  result:any;
  departmentListDrop = [];
  colleges: College[];
  locationName: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private user: UserService
  ) {
    this._user = JSON.parse(sessionStorage.getItem('applicant_details') || '{}');
    this.U.name = this._user.name
    this.U.lastName = this._user.lastName
    this.U.email = this._user.email
    this.U.contact = this._user.contact
    this.U.guardianFirstName = this._user.guardianFirstName
  }

  ngOnInit(): void {
    this.user.getCollege().subscribe((colleges: College[] | any) => {
      this.colleges = colleges;
      //console.log(colleges)
    });
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      location: ['', [Validators.required]],
      college: ['', [Validators.required]],
      register_no: ['', [Validators.required]],
      father_name: ['', [Validators.required]],
      father_last: ['', [Validators.required]],
      father_email: ['', [Validators.required,Validators.email]],
      father_phone: ['', [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      department: ['', [Validators.required]],
      year: ['', [Validators.required]],
      paymentMode: ['', [Validators.required]],
      checkbox: ['', [Validators.required]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registrationForm.controls;
  }
  onSubmit() {
    console.log(this.registrationForm.value)
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    } else {
      console.log(this.registrationForm.value)
      this.user
        .postUser(this.registrationForm.value,this.collegeName,this.courseName,this.locationName)
      
        .pipe(first())
        .subscribe(
          (data) => {
            if (this.registrationForm.value.paymentMode === 'No-cost EMI') {
            
              sessionStorage.setItem(
                'applicant_details',
                JSON.stringify(this.U)
              );
              this.router.navigate(['/emi']);
            } else {
              this.router.navigate(['/auth/subscribe']);
              sessionStorage.setItem(
                'applicant_details',
                JSON.stringify(this.U)
              );
            }
          },
          (error: any) => {
            this.error = error ? error : 'Not a valid authentication';
            this.inCorrectAuthorization();
          }
        );
    }
  }

  FirstName(event: any) {
    this.U.name = event.target.value;
  }
  LastName(event: any) {
    this.U.lastName = event.target.value;
  }
  Email(event: any) {
    this.U.email = event.target.value;
  }
  Phone(event: any) {
    this.U.contact = event.target.value;
  }
  College(event: any) {
    this.U.college = event.target.value;
    var col = this.U.college
   this.result = this.collegeListDrop.map(function(a){
      return a
    })
   this.selectCollege = this.result.filter(
     (name:any)=> {
      let int =event.target.value
       return name.id == int
     }
   )
   this.collegeName = this.selectCollege[0].name
   console.log(this.collegeName)
  }
  Course(event: any) {
    this.U.department = event.target.value;
    this.result = this.departmentListDrop.map(function(a){
      return a
    })
   this.selectCourse = this.result.filter(
     (name:any)=> {
      let int =event.target.value
       return name.id == int
     }
   )
   this.courseName = this.selectCourse[0].name
   console.log(this.courseName)
    
  }

  public locationSet(event: any) {
    this.U.location = event.target.value;

    this.collegeID = +this.registrationForm.value.location;

    this.collegeListDrop = this.college.filter(
      (c: any) => c.collegeID === this.collegeID
    );

     
     this.selectedLocation = this.Location.filter(
       (name:any)=>{
        let int = event.target.value;
        return name.id == int;
       }
       
     )
    this.locationName = this.selectedLocation[0].name
    console.log(this.locationName)
  }

  public yearSet() {
    //console.log(this.registrationForm.value.location);
    this.departmentID = this.registrationForm.value.year;

    this.departmentListDrop = this.department.filter(
      (c: any) => c.departmentID === this.departmentID
    );
  }
  inCorrectAuthorization() {
    Swal.fire({
      position:'center',
      icon: 'warning',
      title: 'User already exist',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  isCorrectAuthorization() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Welcome to MINDCARE',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
