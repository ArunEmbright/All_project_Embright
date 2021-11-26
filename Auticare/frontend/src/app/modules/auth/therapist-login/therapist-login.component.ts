import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Role } from 'src/app/core/models/role';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-therapist-login',
  templateUrl: './therapist-login.component.html',
  styleUrls: ['./therapist-login.component.scss']
})
export class TherapistLoginComponent implements OnInit {

  Role=Role;
  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;
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
  constructor(private authService: AuthService,private authenRole:AuthenticationService,private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() { return this.loginForm.controls; }

  //role based plaese check it

// loginRole(role: Role, 
  
//  ){
//   this.authenRole.login( role);
//     this.router.navigate(['/admin']);
// }
onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.loginForm.invalid) {
    return;
  } else {      
      this.authService.TherapistLogin(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe((res: any) => {
      
            this.router.navigate(['/doctor']);
          },
         
        
          error => {
            this.error = error ? error : '';
            this.inCorrectAuthorization();
          });      
  }
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
    title:'Welcome to AUTICARE',
    showConfirmButton:false,
    timer:1500
  })
}
}
