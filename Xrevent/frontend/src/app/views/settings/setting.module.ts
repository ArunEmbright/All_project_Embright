import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { CombinedComponent } from './combined.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SecurityComponent } from './security/security.component';



const roots: Routes=[
  {
    path:'',
    data:{
      title:'Setting'
    },
    children:[
      {
        path:'',
        redirectTo:'settings',
        pathMatch:'full'
      },
      {
        path:'settings',
        component:CombinedComponent,
  
      }
    ]
    
    
  }
]

@NgModule({
  declarations: [
    ProfileComponent,
    CombinedComponent,
    SecurityComponent,

    
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatInputModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(roots)
  ]
})
export class SettingModule { }
