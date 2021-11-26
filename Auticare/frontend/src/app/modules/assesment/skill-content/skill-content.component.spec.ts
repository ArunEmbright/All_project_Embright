import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillContentComponent } from './skill-content.component';

describe('SkillContentComponent', () => {
  let component: SkillContentComponent;
  let fixture: ComponentFixture<SkillContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
