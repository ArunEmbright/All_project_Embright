import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExhibitorsComponent } from './create-exhibitors.component';

describe('CreateExhibitorsComponent', () => {
  let component: CreateExhibitorsComponent;
  let fixture: ComponentFixture<CreateExhibitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExhibitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExhibitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
