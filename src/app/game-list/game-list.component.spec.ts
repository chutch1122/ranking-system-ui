import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GameListComponent} from './game-list.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {Player} from '../models/player.model';
import {Rating} from '../models/rating.model';
import {GameType} from '../models/game-type.model';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getFullName()', ()  => {
    it('should concat first name and last name', () => {
      const player: Player = {
        id: 1,
        firstName: 'Bob',
        lastName: 'McFoosball',
        ratings: []
      };

      const name = component.getFullName(player);

      const expected = 'Bob M.';

      expect(name).toEqual(expected);
    });
  });

  describe('getRatingDelta', () => {
    it('should return a players delta', () => {


      const rating: Rating = {
        game: GameType.FOOSBALL,
        rating: 1000,
        delta: 9,
        createdOn: ''
      };

      const player: Player = {
        id: 1,
        firstName: 'Bob',
        lastName: 'McFoosball',
        ratings: [rating[0]]
      };

      const delta = component.getRatingDelta(player);


    });
  });
});
