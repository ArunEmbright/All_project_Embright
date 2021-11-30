import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes  } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VarifyOTPComponent } from './varify-otp/varify-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';

const routes : Routes= [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register', 
    component:RegisterComponent
  },
  {
    path:'activate/:token',
    component:ActivateAccountComponent
  },
  {
    path:'forgot-password',
    component:ForgotPasswordComponent
  },
  {
    path:'varify-otp',
    component:VarifyOTPComponent
  },
  {
    path:'update-password',
    component:ChangePasswordComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AuthRoutingModule { }
