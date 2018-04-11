import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericStoplightComponent } from './numeric-stoplight.component';

describe('NumericStoplightComponent', () => {
  let component: NumericStoplightComponent;
  let fixture: ComponentFixture<NumericStoplightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericStoplightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericStoplightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
