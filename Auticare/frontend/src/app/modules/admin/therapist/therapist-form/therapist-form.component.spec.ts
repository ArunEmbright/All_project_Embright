import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistFormComponent } from './therapist-form.component';

describe('TherapistFormComponent', () => {
  let component: TherapistFormComponent;
  let fixture: ComponentFixture<TherapistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
