import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authService } from '../_services/auth-service';
import { LoginComponent } from './login/login.component';
import { WebRequestService } from '../_services/Web-RequestURL';
import { WebReqInterceptor } from '../_services/Web-req-interceptor';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VarifyOTPComponent } from './varify-otp/varify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

@NgModule({
  declarations: [
     RegisterComponent,
     LoginComponent,
     ForgotPasswordComponent,
     VarifyOTPComponent,
     ChangePasswordComponent,
     ActivateAccountComponent,
   
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    authService,
     WebRequestService,
  {
    provide: HTTP_INTERCEPTORS, useClass:WebReqInterceptor, multi:true
  }
    
  ]
})
export class AuthModule { }
