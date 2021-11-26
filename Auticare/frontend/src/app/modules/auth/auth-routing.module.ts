import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { TherapistLoginComponent } from './therapist-login/therapist-login.component';
import { TokenVerifyComponent } from './token-verify/token-verify.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component'
import { ActiveComponent } from './active/active.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TherapistVerifyComponent } from './therapist-verify/therapist-verify.component';
const routes: Routes = [
  {
      path: '',
      redirectTo: 'login', 
      pathMatch: 'full'
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
},
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'signup',
      component: SignupComponent
  },
  {
    path: 'verify/otp',
    component: TokenVerifyComponent
},
{
  path:'therapist-login',
  component:TherapistLoginComponent
},
{
  path:'update-password',
  component:ChangePasswordComponent
},
{
  path:'forgot-password',
  component:ForgotPasswordComponent
},
{
  path:'verify-otp',
  component:VerifyOtpComponent
},
{ path: 'activate/:token', component:ActiveComponent },
{ path: 'therapist_Verify', component:TherapistVerifyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
