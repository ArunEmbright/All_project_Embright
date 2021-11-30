import {HttpEvent, HttpHandler, HttpInterceptor,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from 'src/app/_services/auth-service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-varify-otp',
  templateUrl: './varify-otp.component.html',
  styleUrls: ['./varify-otp.component.scss']
})
export class VarifyOTPComponent  implements OnInit, HttpInterceptor {

  form: FormGroup;
  otp:string;
  email:string;
  error=null;
  constructor( private authService: authService
    , private router: Router
    , private route: ActivatedRoute) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.route.params.subscribe(()=>{
      this.email =this.authService.Mail;
      console.log(this.authService.Mail)
    })
  }

  confirmed(){
    Swal.fire({
      position:'top-end',
      icon:'success',
      title:'OTP Varified',
      showConfirmButton:false,
      timer:1500
    })
  }

  inCorrectOTP(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:'OTP is not varified',
      showConfirmButton:false,
      timer:1500
    })
  }

  expiredOTP(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:'OTP has expired',
      showConfirmButton:false,
      timer:1500
    })
  }

  VerifyOtp(){
    this.authService.OTPVarification(this.otp).subscribe(
      (res)=>{
        this.router.navigate(['/mindcare/auth/update-password'])
        this.confirmed()
      },
      (error)=>{
        this.inCorrectOTP();
        this.error = error.message;
      }

    )
  }

}
