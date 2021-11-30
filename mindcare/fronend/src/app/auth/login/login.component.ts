
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { authService } from 'src/app/_services/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  serverErrorMessages: string;
  error=null;
  submitted = false;
  isLoading= false;
  constructor(private accountService: authService, private formBuilder: FormBuilder, private route:Router) { }

  ngOnInit(): void {
   
    
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)]]
    })
  }
get f(){
  return this.loginForm.controls
}
inCorrectAuthorization(){
  Swal.fire({
    position:'top-end',
    icon:'warning',
    title:'Invalid email or password',
    showConfirmButton:false,
    timer:1500
  })
}

isCorrectAuthorization(){
  Swal.fire({
    position:'top-end',
    icon:'success',
    title:'Welcome to MINDCARE',
    showConfirmButton:false,
    timer:1500
  })
}
onSubmit(){
  this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {    
      this.isLoading = true;  
        this.accountService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(() => {
              this.route.navigate(['/main/dashboard']);
              this.isCorrectAuthorization();
            },
            error => {
              this.error = error ? error : 'Not a valid authentication';
              this.inCorrectAuthorization();
              this.isLoading = false;
            });      
    }
}
}
