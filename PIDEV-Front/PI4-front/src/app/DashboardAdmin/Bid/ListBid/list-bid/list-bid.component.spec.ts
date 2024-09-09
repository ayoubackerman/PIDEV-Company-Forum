import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBidComponent } from './list-bid.component';

describe('ListBidComponent', () => {
  let component: ListBidComponent;
  let fixture: ComponentFixture<ListBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
