import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPhotoComponent } from './team-photo.component';

describe('TeamPhotoComponent', () => {
  let component: TeamPhotoComponent;
  let fixture: ComponentFixture<TeamPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
