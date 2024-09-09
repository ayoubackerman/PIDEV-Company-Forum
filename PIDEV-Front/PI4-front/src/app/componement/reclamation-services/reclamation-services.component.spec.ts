import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationServicesComponent } from './reclamation-services.component';

describe('ReclamationServicesComponent', () => {
  let component: ReclamationServicesComponent;
  let fixture: ComponentFixture<ReclamationServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
