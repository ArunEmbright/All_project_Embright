import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { authService } from 'src/app/_services/auth-service';
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

  constructor(
    private authService: authService
    ,private route: ActivatedRoute
    ,private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(()=>{
      this.email = this.authService.Mail;
      console.log(this.authService.Mail)
    })
    this.form = new  FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required]),
    })
  }

  Passwordchanged(){
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'Your password has been successfully changed',
      showConfirmButton:false,
      timer:1500
    })
  }

  passwordMismatch(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:" your password doesn't match",
      showConfirmButton:false,
      timer:1500
    })
  }

  toUpdate(){
    if (this.password === this.confirmPassword) {
      this.authService.UpdatePassword(this.Mail, this.password).subscribe(
        ()=>{
          this.router.navigate(['/mindcare/auth/login'])
          this.Passwordchanged()
        },
        error=>{
          console.log(error)
        }
      )
      
    }else{
      this.passwordMismatch()
    }
  }

}
