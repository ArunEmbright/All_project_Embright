import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidationService } from '../_validators/custom-validation.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup;
  password: string;
  Mail:string;
  confirmPassword: string;
  email:string;

  checkSubmitStatus = false;
  constructor( private authService: AuthService
    , private fb: FormBuilder
    ,private route: ActivatedRoute
    ,private router: Router,private customValidator:CustomValidationService) { }

    ngOnInit(): void {
      this.route.params.subscribe(()=>{
        this.email = this.authService.Mail;
        console.log(this.authService.Mail)
      })
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
        
        this.authService.UpdatePassword(this.Mail, this.password).subscribe(
          ()=>{
            this.router.navigate(['auth/login'])
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