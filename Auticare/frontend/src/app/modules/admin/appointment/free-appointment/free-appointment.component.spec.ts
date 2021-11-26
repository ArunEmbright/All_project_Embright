import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeAppointmentComponent } from './free-appointment.component';

describe('FreeAppointmentComponent', () => {
  let component: FreeAppointmentComponent;
  let fixture: ComponentFixture<FreeAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
