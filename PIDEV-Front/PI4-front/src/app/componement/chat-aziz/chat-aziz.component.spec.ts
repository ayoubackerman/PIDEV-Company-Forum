import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAzizComponent } from './chat-aziz.component';

describe('ChatAzizComponent', () => {
  let component: ChatAzizComponent;
  let fixture: ComponentFixture<ChatAzizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatAzizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatAzizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
