
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/core/models/role';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  Role=Role;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  year: number = new Date().getFullYear();

  carouselOption: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: false,
    dots: true,
    responsive: {
      680: {
        items: 1
      },
    }
  }

  // tslint:disable-next-line: max-line-length
  constructor(private authenRole:AuthenticationService,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

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
      title:'Welcome to AUTICARE',
      showConfirmButton:false,
      timer:1500
    })
  }
  

  /**
   * Form submit
   */
   onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {      
        this.authService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe((res: any) => {
            
            
              this.router.navigate(['/dashboard']);
            
            this.isCorrectAuthorization();
            },
            error => {
              this.error = error ? error : '';
              this.inCorrectAuthorization();
            });      
    }
  }


therapist(){
  this.router.navigate(['auth/therapist-login'])
}
}
