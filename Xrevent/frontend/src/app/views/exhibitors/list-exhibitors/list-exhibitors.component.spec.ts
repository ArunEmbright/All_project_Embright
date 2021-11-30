import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExhibitorsComponent } from './list-exhibitors.component';

describe('ListExhibitorsComponent', () => {
  let component: ListExhibitorsComponent;
  let fixture: ComponentFixture<ListExhibitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExhibitorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExhibitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
