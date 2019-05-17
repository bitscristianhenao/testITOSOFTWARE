import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstPointComponent } from './first-point.component';

describe('FirstPointComponent', () => {
  let component: FirstPointComponent;
  let fixture: ComponentFixture<FirstPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
