import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumniInfoPageComponent } from './alumni-info-page.component';

describe('AlumniInfoPageComponent', () => {
  let component: AlumniInfoPageComponent;
  let fixture: ComponentFixture<AlumniInfoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumniInfoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumniInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
