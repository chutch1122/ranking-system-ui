import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRatingGraphComponent } from './player-rating-graph.component';

describe('PlayerRatingGraphComponent', () => {
  let component: PlayerRatingGraphComponent;
  let fixture: ComponentFixture<PlayerRatingGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerRatingGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRatingGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
