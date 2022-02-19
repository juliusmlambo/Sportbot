import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportbotComponent } from './sportbot.component';

describe('SportbotComponent', () => {
  let component: SportbotComponent;
  let fixture: ComponentFixture<SportbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
