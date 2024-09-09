import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoForumComponent } from './info-forum.component';

describe('InfoForumComponent', () => {
  let component: InfoForumComponent;
  let fixture: ComponentFixture<InfoForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoForumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
