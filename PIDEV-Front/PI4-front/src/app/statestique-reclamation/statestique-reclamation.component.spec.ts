import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatestiqueReclamationComponent } from './statestique-reclamation.component';

describe('StatestiqueReclamationComponent', () => {
  let component: StatestiqueReclamationComponent;
  let fixture: ComponentFixture<StatestiqueReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatestiqueReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatestiqueReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
