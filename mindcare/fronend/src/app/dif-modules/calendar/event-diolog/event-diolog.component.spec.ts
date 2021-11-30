import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDiologComponent } from './event-diolog.component';

describe('EventDiologComponent', () => {
  let component: EventDiologComponent;
  let fixture: ComponentFixture<EventDiologComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDiologComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDiologComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
