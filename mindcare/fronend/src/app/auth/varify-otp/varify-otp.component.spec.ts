import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarifyOTPComponent } from './varify-otp.component';

describe('VarifyOTPComponent', () => {
  let component: VarifyOTPComponent;
  let fixture: ComponentFixture<VarifyOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VarifyOTPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VarifyOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
