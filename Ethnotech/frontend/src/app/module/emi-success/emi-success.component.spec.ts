import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmiSuccessComponent } from './emi-success.component';

describe('EmiSuccessComponent', () => {
  let component: EmiSuccessComponent;
  let fixture: ComponentFixture<EmiSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmiSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmiSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
