import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './module/privacy-policy/privacy-policy.component';
import { TermsConditionComponent } from './module/terms-condition/terms-condition.component'
import { SuccessComponent } from './module/success/success.component';
import { AuthAdminService } from './guards/admin.guard';
import { EmiSuccessComponent } from './module/emi-success/emi-success.component';

const routes: Routes = [
 
  {
    path:'',
    redirectTo:'auth/register',
    pathMatch:'full'
  },
   {
    path: 'auth',
     loadChildren: () => import('./module/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin',
     canActivate:[AuthAdminService],
     loadChildren: () => import('./module/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'terms_condition',
    component: TermsConditionComponent
  
  },
  {
    path: 'privacy_policy',
    component: PrivacyPolicyComponent
  
  },
  {
    path: 'Success',
    component: SuccessComponent
  
  },
  {
    path: 'emiSuccess',
    component: EmiSuccessComponent
  
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top', relativeLinkResolution: 'corrected', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
