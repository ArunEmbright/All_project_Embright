import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTherapistComponent } from './book-therapist.component';

describe('BookTherapistComponent', () => {
  let component: BookTherapistComponent;
  let fixture: ComponentFixture<BookTherapistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookTherapistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTherapistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
