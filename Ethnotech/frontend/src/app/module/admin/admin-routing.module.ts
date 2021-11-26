import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { AddCollegeComponent } from './add-college/add-college.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';

const routes: Routes = [
  {
    path: 'user-detail',
    component: UserTableComponent
},
{
  path: 'Add-College',
  component: AddCollegeComponent
},
{
  path: 'payment-Details',
  component: PaymentDetailsComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'corrected', useHash: true })],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
