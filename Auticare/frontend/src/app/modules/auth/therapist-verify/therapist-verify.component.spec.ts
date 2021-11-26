import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TherapistVerifyComponent } from './therapist-verify.component';

describe('TherapistVerifyComponent', () => {
  let component: TherapistVerifyComponent;
  let fixture: ComponentFixture<TherapistVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TherapistVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TherapistVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
