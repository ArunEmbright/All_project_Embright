import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { authService } from 'src/app/_services/auth-service';
import { MustMatch } from '../../core/helpers';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  
  form: FormGroup;
  isLoading= false;
  submitted=false;

  constructor( private formBulder: FormBuilder,  private accountService: authService) { }

  basicMessage() {
    Swal.fire({
      title: 'Please Check your registered email \n for login',
      confirmButtonColor: '#5438dc',
    });
  }
  titleText() {
    Swal.fire({
      title: 'Your email is already registered ',
      text: 'please register with another account',
      icon: 'question',
      confirmButtonColor: '#5438dc'
    });
  }
  ngOnInit(): void {
    this.form = this.formBulder.group({
      firstName:['', Validators.required],
      lastName:['',Validators.required],
      email:['', [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      dob:['', Validators.required],
      phoneNumber:['',Validators.required],
      password:['',[Validators.required, Validators.minLength(6)]],
      confirmPassword:['', Validators.required]
    },{
      validator: MustMatch('password', 'confirmPassword')
    })
  }
/**
 * get f
 */
public get f() {
  return this.form.controls
}

  onSubmit(){
    this.submitted=true;
   
    if(this.form.invalid)
    {
    return;
    }
    this.isLoading=true
    this.accountService.register(this.form.value).pipe(first())
    .subscribe({
      next:()=>{
        this.basicMessage()
      },
      error:error=>{
        this.isLoading=false
        this.titleText()
      }
    })
  }
 

}
