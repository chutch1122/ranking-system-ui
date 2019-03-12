import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTypeDetailsComponent } from './game-type-details.component';

describe('GameTypeDetailsComponent', () => {
  let component: GameTypeDetailsComponent;
  let fixture: ComponentFixture<GameTypeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTypeDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
