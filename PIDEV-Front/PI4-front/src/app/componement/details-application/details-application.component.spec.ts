import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsApplicationComponent } from './details-application.component';

describe('DetailsApplicationComponent', () => {
  let component: DetailsApplicationComponent;
  let fixture: ComponentFixture<DetailsApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
