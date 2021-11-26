import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutismComponent } from './autism.component';

describe('AutismComponent', () => {
  let component: AutismComponent;
  let fixture: ComponentFixture<AutismComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutismComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
