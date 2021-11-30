import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsycologyComponent } from './psycology.component';

describe('PsycologyComponent', () => {
  let component: PsycologyComponent;
  let fixture: ComponentFixture<PsycologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsycologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsycologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
