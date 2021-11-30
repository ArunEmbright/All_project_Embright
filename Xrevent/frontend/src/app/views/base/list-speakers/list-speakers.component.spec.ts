import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSpeakersComponent } from './list-speakers.component';

describe('ListSpeakersComponent', () => {
  let component: ListSpeakersComponent;
  let fixture: ComponentFixture<ListSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSpeakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
