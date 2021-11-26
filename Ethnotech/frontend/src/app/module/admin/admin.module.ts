import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { OrderModule } from 'ngx-order-pipe';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, FilterService } from '@syncfusion/ej2-angular-grids';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { AddCollegeComponent } from './add-college/add-college.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  declarations: [
    UserTableComponent,
    AddCollegeComponent,
    PaymentDetailsComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    OrderModule, 
    ReactiveFormsModule, 
    GridModule,
    DropDownListAllModule,
    FormsModule,
    TagInputModule

  ]
})
export class AdminModule { }
