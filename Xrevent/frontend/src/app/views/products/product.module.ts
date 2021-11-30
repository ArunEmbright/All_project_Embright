import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditProductsComponent } from './edit-products/edit-products.component';
const roots: Routes=[

  {
    path:'',
   
    data:{
      title:'products'
    },
    children:[
      {
        path:'',
        redirectTo:'list-product',
        pathMatch:'full'
      },
      {
        path:'edit-product/:listId',
        component:EditProductsComponent,
      },
      {
        path:'list-product',
        component: ListProductComponent,
        data:{
          title:'List-Product'
        }
      },
      {
        path:'create-product',
        component:CreateProductComponent,
        data:
        {
          title:'Create-Product'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [
    ListProductComponent, 
    CreateProductComponent, EditProductsComponent
  ],
  imports: [
    CommonModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    RouterModule.forChild(roots)
  ]
})


export class ProductModule { }
