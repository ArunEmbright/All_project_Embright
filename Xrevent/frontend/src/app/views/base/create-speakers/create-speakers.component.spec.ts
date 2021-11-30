import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSpeakersComponent } from './create-speakers.component';

describe('CreateSpeakersComponent', () => {
  let component: CreateSpeakersComponent;
  let fixture: ComponentFixture<CreateSpeakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSpeakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSpeakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
