import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSubmissionComponent } from './player-submission.component';

describe('PlayerSubmissionComponent', () => {
  let component: PlayerSubmissionComponent;
  let fixture: ComponentFixture<PlayerSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
