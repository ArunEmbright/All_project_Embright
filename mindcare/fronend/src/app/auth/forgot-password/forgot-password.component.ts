import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { authService } from 'src/app/_services/auth-service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;
  email:string;
  submitted = false;
  constructor(private authService: authService, 
    private formBulder: FormBuilder,  
    private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl('',[ Validators.required])
    })
  }

public get f()   {
  return  this.form.controls
}


  otpPut(){
    this.submitted=true;
    
    this.authService.forgotPassword(this.email).subscribe(
      data=>{
        console.log('Send', data);
        this.router.navigate(['/mindcare/auth/varify-otp'])
      },
      error=>console.log(error)
    )
  }
}
