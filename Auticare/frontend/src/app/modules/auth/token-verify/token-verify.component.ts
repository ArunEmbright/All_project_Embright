import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-token-verify',
  templateUrl: './token-verify.component.html',
  styleUrls: ['./token-verify.component.scss']
})
export class TokenVerifyComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '60px',
      'height': '40px'
    }
  };

  otpCode = '';
  ngOnInit(): void {
    document.body.classList.remove('auth-body-bg');
  }

  onOtpChange($event: any) {
    this.otpCode = $event;
  }

  submit() {
    if(this.otpCode.length == 4) {
      const params = {otp: this.otpCode };
      this.authService.otpVerify(params)
          .subscribe((res: any) => {

            if(res.data.isValid) {
              this.successmsg();
            } else {
              this.confirm();
            }
            },
            error => {
              
            }); 
    }
  }
 // set the currenr year
 year: number = new Date().getFullYear();



successmsg() {
  Swal.fire({
    icon: 'success',
    title: 'Your Otp has been verified',
    showConfirmButton: false,
    timer: 2000
  }).then((result) => {
    this.router.navigate(['/auth/login']);
  });
}

resendOtp() {
  setTimeout(() => {
    Swal.fire('', 'Please check your email to verify the otp', 'success');
  }, 500);
}

 confirm() {
  Swal.fire({
    title: '',
    text: 'Your entered OTP is wrong!',
    icon: 'warning',
    confirmButtonText: 'close'
  })
}

}
