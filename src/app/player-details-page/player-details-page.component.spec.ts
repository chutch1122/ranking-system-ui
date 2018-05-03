import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerDetailsPageComponent } from './player-details-page.component';

describe('PlayerDetailsPageComponent', () => {
  let component: PlayerDetailsPageComponent;
  let fixture: ComponentFixture<PlayerDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
