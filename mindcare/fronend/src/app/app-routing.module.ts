import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { DefaultLayoutComponent } from './container';
import {AuthGuard } from './_guard/authGuard';


const routes: Routes = [
 
{
  path:'',
  redirectTo:'mindcare',
  pathMatch:'full'
},
{
  path:'mindcare', 
  component:AuthLayoutComponent,
  children:[

    {
      path:'',
      redirectTo:'auth',
      pathMatch:'full'
    },
    {
      
        path:'auth',
        loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule)
      
    }
  ]
},

{
  path:'',
  component:DefaultLayoutComponent,
  canActivate:[AuthGuard],

  children:[
   
    {
      path:'main',
      loadChildren:()=>import('./dif-modules/dashboard/dashboard.module').then(m=>m.DashboardModule)
    },
    {
      path:'user',
      loadChildren:()=>import('./dif-modules/profile/profile.module').then(m=>m.ProfileModule)
    },
    {
      path:'calendar',
      loadChildren:()=>import('./dif-modules/calendar/calendar.module').then(m=>m.CalendarModules)
    },
    {
      path:'doctor',
      loadChildren:()=>import('./dif-modules/doctors/doctors.module').then(m=>m.DoctorsModule)
    }
  ]
  
}
  
  
];


@NgModule({
  imports: [
    
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
