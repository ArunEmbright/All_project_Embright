import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/guards/admin.guard'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  constructor(private admin: AuthAdminService,private route: ActivatedRoute,private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const isAuthorized = localStorage.getItem('isAuthorized');
    if (isAuthorized === '1') {
      this.router.navigate(['admin/user-detail']);
    } else {
      this.router.navigate(['auth/login']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  onSubmit() {
     //console.log(this.loginForm.value)
    return this.admin.signIn(this.loginForm.value.email, this.loginForm.value.password); 

  }
}
