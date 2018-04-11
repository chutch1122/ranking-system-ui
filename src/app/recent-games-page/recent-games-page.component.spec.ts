import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGamesPageComponent } from './recent-games-page.component';

describe('RecentGamesPageComponent', () => {
  let component: RecentGamesPageComponent;
  let fixture: ComponentFixture<RecentGamesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentGamesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentGamesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
