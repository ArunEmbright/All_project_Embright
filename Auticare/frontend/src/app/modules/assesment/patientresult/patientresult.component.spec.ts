import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientresultComponent } from './patientresult.component';

describe('PatientresultComponent', () => {
  let component: PatientresultComponent;
  let fixture: ComponentFixture<PatientresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientresultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
