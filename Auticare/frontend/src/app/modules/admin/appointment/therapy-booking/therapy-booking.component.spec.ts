import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapyBookingComponent } from './therapy-booking.component';

describe('TherapyBookingComponent', () => {
  let component: TherapyBookingComponent;
  let fixture: ComponentFixture<TherapyBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapyBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapyBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
