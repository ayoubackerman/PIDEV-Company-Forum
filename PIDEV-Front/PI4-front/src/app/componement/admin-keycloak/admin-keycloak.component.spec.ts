import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminKeycloakComponent } from './admin-keycloak.component';

describe('AdminKeycloakComponent', () => {
  let component: AdminKeycloakComponent;
  let fixture: ComponentFixture<AdminKeycloakComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminKeycloakComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminKeycloakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
