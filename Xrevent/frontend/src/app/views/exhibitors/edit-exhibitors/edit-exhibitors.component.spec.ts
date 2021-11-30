import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExhibitorsComponent } from './edit-exhibitors.component';

describe('EditExhibitorsComponent', () => {
  let component: EditExhibitorsComponent;
  let fixture: ComponentFixture<EditExhibitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExhibitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExhibitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
