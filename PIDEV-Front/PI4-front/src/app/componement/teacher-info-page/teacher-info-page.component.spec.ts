import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInfoPageComponent } from './teacher-info-page.component';

describe('TeacherInfoPageComponent', () => {
  let component: TeacherInfoPageComponent;
  let fixture: ComponentFixture<TeacherInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
