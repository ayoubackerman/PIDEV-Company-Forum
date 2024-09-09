import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStandComponent } from './list-stand.component';

describe('ListStandComponent', () => {
  let component: ListStandComponent;
  let fixture: ComponentFixture<ListStandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
