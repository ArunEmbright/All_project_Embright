import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UIModule } from "../../shared/ui/ui.module";
import { RouterModule } from "@angular/router";
import { SelectTherapistComponent } from "./therapist-selection/therapist.component";
import { TherapistRoutingModule } from "./therapist-routing.module";
import { TherapistListComponent } from './therapist-list/therapist-list.component';
import { ArchwizardModule } from "angular-archwizard";
import { NgbAccordionModule, NgbCollapseModule, NgbNavModule, NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
  declarations: [
    SelectTherapistComponent,
     TherapistListComponent,

    ],
  imports: [
    CommonModule, 
    
    ReactiveFormsModule,
    FormsModule, 
    UIModule, 
    TherapistRoutingModule,

    ArchwizardModule,
    NgbAccordionModule,
    NgbNavModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgbTooltipModule,
    NgbCollapseModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),

  ],
  
  exports: [RouterModule],
})
export class TherapistModule {}
