import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { OwlOptions } from 'ngx-owl-carousel-o';
import Swal from "sweetalert2";

@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.scss"],
})
export class VerifyOtpComponent implements OnInit {
  form: FormGroup;
  otp: string;
  email: string;
  error = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    throw new Error("Method not implemented.");
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
      title:'OTP verified',
      showConfirmButton:false,
      timer:1500
    })
  }

  inCorrectOTP(){
    Swal.fire({
      position:'top-end',
      icon:'warning',
      title:'OTP is not verified',
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
    console.log(this.otp)
    this.authService.OTPVarification(this.otp).subscribe(
      (res)=>{
        this.router.navigate(['auth/update-password'])
        this.confirmed()
      },
      (error)=>{
        this.inCorrectOTP();
        this.error = error.message;
      }

    )
  }
}
