import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { RegisterComponent } from './register/register.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { EmiComponent } from './emi/emi.component';
import { FooterComponent } from '../footer/footer.component';
import { LoginComponent } from './login/login.component'
@NgModule({
  declarations: [
    RegisterComponent,
    SubscribeComponent,
    EmiComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class UserModule { }
