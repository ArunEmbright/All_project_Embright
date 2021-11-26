import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthTherapistGuard } from './core/guards/therapist.gurad';
import { Role } from './core/models/role';
import { AuthenticationService } from './core/services/auth.service';
import { DoctorLayoutComponent } from './doctorLayout/layout.component';

import { LayoutComponent } from './layouts/layout.component';
import { AdminLayoutComponent } from './adminLayout/layout.component';
import { AuthAdminService } from './core/guards/admin.guard';
import { institutionLayoutComponent } from './institutionLayout/layout.component';

const routes: Routes = [
   { 
     path: '', redirectTo: 'patient-data', pathMatch: 'full' 
    },
  //  {
  //    path:'patient-data',
  //    loadChildren:()=>import ('./modules/assesment/assesment.module').then(e=>e.AssesmentModule)
  //   },
   {
    path: 'auth',
     loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
   
   {
     path:'', 
     component:LayoutComponent, 
     children:[
      { 
        path: 'dashboard',
        canLoad:[AuthGuard],
        canActivate:[AuthGuard], 
         loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      {
         path: 'therapist',  
         loadChildren: () => import('./modules/therapist/therapist.module').then(m => m.TherapistModule) 
      },
      
      { 
        path: 'settings', 
        loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule) 
      },

      {
        path:'home', 
        canLoad:[AuthGuard],
        canActivate:[AuthGuard],  
        loadChildren:()=>import('../app/modules/home/home.module').then(e=>e.HomeModule)
      },
      {
        path:'assessments',  
        loadChildren:()=>import('../app/modules/assesment/assesment.module').then(e=>e.AssesmentModule)
      },
      {
        path:'booking',  
        loadChildren:()=>import('../app/modules/book-appointment/book-appointment.module').then(e=>e.BookAppointmentModule)
      },
      {
        path:'calendar',  
        loadChildren:()=>import('../app/modules/calendar/calendar-routing.module').then(e=>e.CalendarRoutingModule)
      },
      
      // {
      //   path:'home',  
      //   loadChildren:()=>import('../app/modules/home/home-routing.module').then(e=>e.HomeModule)
      // },
      
   ]
  },
  {
    path:'', 
    component:AdminLayoutComponent, 
    children:[
      {
        path:'admin', 
        canActivate:[AuthAdminService],
        //  canActivate:[AuthGuard], 
        data:{
          roles:[
            Role.THERAPIST
          ]
        },
        loadChildren:()=>import('./modules/admin/admin-module').then(e=>e.AdminModule)
      },
     
  ]
 },
 {
  path:'', 
  component:institutionLayoutComponent, 
  children:[
    {
      path:'institution', 
      // canActivate:[AuthAdminService],
      //  canActivate:[AuthGuard], 
      data:{
        roles:[
          Role.THERAPIST
        ]
      },
      loadChildren:()=>import('./modules/institution/institution.module').then(e=>e.InstitutionModule)
    },
   
]
},
  {
    path:'',
    component:DoctorLayoutComponent,
    canActivate:[AuthTherapistGuard],
    canLoad:[AuthGuard],
    children:[
      {
        path:'doctor',
        canLoad:[],
        canActivate:[],
        data:{
          roles:[
            Role.THERAPIST
          ]
        },
        loadChildren:()=>import('./modules/doctor/doctor.module').then(m=>m.DoctorModule)
      },
    ]
  },
  
  {
   path: '**',
   redirectTo: 'login',
   pathMatch: 'full'
 
 },
  
   {path: 'assessment', loadChildren: () => import('./modules/assesment/assesment.module').then(m => m.AssesmentModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'corrected', useHash: true })],
  exports: [RouterModule],
  providers:[
    AuthGuard,
    AuthTherapistGuard,
    AuthenticationService
  ]
})

export class AppRoutingModule { }
