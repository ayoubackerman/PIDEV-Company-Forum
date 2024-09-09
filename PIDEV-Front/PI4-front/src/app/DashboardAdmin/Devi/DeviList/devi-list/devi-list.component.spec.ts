import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviListComponent } from './devi-list.component';

describe('DeviListComponent', () => {
  let component: DeviListComponent;
  let fixture: ComponentFixture<DeviListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
