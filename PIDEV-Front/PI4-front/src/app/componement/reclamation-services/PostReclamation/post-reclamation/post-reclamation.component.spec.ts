import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReclamationComponent } from './post-reclamation.component';

describe('PostReclamationComponent', () => {
  let component: PostReclamationComponent;
  let fixture: ComponentFixture<PostReclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostReclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
