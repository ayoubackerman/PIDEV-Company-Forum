import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSessionComponent } from './post-session.component';

describe('PostSessionComponent', () => {
  let component: PostSessionComponent;
  let fixture: ComponentFixture<PostSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
