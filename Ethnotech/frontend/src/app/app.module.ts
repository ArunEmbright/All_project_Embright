import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './module/user/user.module';
import { AdminModule } from './module/admin/admin.module';
import { PrivacyPolicyComponent } from './module/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './module/terms-condition/terms-condition.component';
import { SuccessComponent } from './module/success/success.component';
import { EmiSuccessComponent } from './module/emi-success/emi-success.component';

@NgModule({
  declarations: [
    AppComponent,
    PrivacyPolicyComponent,
    TermsConditionComponent,
    SuccessComponent,
    EmiSuccessComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    AdminModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 