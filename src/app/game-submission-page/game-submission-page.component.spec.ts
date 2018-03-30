import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSubmissionPageComponent } from './game-submission-page.component';

describe('GameSubmissionPageComponent', () => {
  let component: GameSubmissionPageComponent;
  let fixture: ComponentFixture<GameSubmissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameSubmissionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSubmissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
