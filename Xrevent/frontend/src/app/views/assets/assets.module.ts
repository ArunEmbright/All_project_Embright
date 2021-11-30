import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListAssetsComponent } from './list-assets/list-assets.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssetsComponent } from './create-assets/create-assets.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditAssetsComponent } from './edit-assets/edit-assets.component';
const childRoutes: Routes = [
  {
    path:'',
    data:{
      title: 'Assets'
    },
    children:[
      {
        path:'',
        redirectTo:'list-assets',
        pathMatch:'full'
      },
      {
        path:'list-assets',
        component:ListAssetsComponent,
        data:{
          title:'List Assets'
        }
      },
      {
        path:'edit-assets/:listId',
        component:EditAssetsComponent,
      },
      {
        path:'create-assets',
        component:CreateAssetsComponent,
        data:{
          title:'Create-Assets'
        }
      }
    ]
  }
]


@NgModule({
  declarations: [
    ListAssetsComponent, 
    CreateAssetsComponent, EditAssetsComponent
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(childRoutes)
  ]
})
export class AssetsModule { }
