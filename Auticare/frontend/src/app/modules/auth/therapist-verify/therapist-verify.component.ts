import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../_validators/custom-validation.service';
import { AdminService } from '../../admin/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-therapist-verify',
  templateUrl: './therapist-verify.component.html',
  styleUrls: ['./therapist-verify.component.scss']
})
export class TherapistVerifyComponent implements OnInit {
  form: FormGroup;
  password: string;
  confirmPassword: string;
  email:string;
  checkSubmitStatus = false;
  constructor(private authService: AuthService
    , private fb: FormBuilder
    ,private route: ActivatedRoute
    ,private router: Router,private customValidator:CustomValidationService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', [
        Validators.required, 
        Validators.pattern('(?!.* )(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d$@$!@#$%^&*].{7,20}')]
    ],
      confirmPassword: ['', Validators.required],
    },
    {
      validator:this.customValidator.passwordMatchValidator('password','confirmPassword')    
     })
  }
  toUpdate(){
    this.checkSubmitStatus = true;
    if (this.password === this.confirmPassword) {
      
      this.authService.verifyTherapist(this.email, this.password).subscribe(
        ()=>{
          this.router.navigate(['auth/therapist-login'])
          this.successAlert();
        },error=>{
          console.log(error)
        }
        
      )
      } else{
        this.errorAlert();
      }
      }
      
    
  
  successAlert() {
    Swal.fire({
      icon: 'success',
      title: 'Your password was successfully changed, Please login use your new password',
      showConfirmButton: false,
      timer: 3000
    }).then((result) => {
      this.router.navigate(['/auth/login']);
    });
  }

  errorAlert() {
    Swal.fire({
      icon: 'error',
      title: "Password mismatch",
      showConfirmButton: false,
    })
  }
}
