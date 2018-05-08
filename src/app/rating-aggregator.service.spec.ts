import { inject, TestBed } from '@angular/core/testing';
import { GameType } from "./models/game-type.model";
import { Rating } from "./models/rating.model";

import { RatingAggregatorService } from './rating-aggregator.service';

describe('RatingAggregatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingAggregatorService]
    });
  });

  it('should be created', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
    expect(service).toBeTruthy();
  }));

  describe('aggregate', () => {
    describe('by day', () => {
     it('should fill in the gaps for a first game', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];
        let pingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.PINGPONG, rating: 1200, delta: -1, createdOn: '2018-04-03T05:00:00'},
          {game: GameType.PINGPONG, rating: 1300, delta: -1, createdOn: '2018-04-04T05:00:00'},
          {game: GameType.PINGPONG, rating: 1400, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);


        let expectedFoosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-03T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-04T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];

        expect(result.foosball).toEqual(expectedFoosballRatings);
        expect(result.pingpong).toEqual(pingpongRatings);
      }));

      it('should fill in the gaps for a second game', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1200, delta: -1, createdOn: '2018-04-03T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1300, delta: -1, createdOn: '2018-04-04T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1400, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];
        let pingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);

        let expectedPingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-03T05:00:00'},
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-04T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];

        expect(result.foosball).toEqual(foosballRatings);
        expect(result.pingpong).toEqual(expectedPingpongRatings);
      }));

      fit('should fill in the gaps for both games', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1400, delta: -1, createdOn: '2018-04-06T05:00:00'},
        ];
        let pingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
        ];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);

        let expectedFoosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1400, delta: -1, createdOn: '2018-04-06T05:00:00'},
        ];

        let expectedPingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-06T05:00:00'},
        ];

        expect(result.foosball).toEqual(expectedFoosballRatings);
        expect(result.pingpong).toEqual(expectedPingpongRatings);
      }));

      it('should extend data points to most recent for both games', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 9999, delta: -1, createdOn: '2018-04-02T05:00:00'},
        ];
        let pingPongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 8888, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];

        let result = service.aggregate('day', foosballRatings, pingPongRatings);

        let expectedFoosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 9999, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 9999, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];
        let expectedPingPongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.PINGPONG, rating: 8888, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];

        expect(result.foosball).toEqual(expectedFoosballRatings);
        expect(result.pingpong).toEqual(expectedPingPongRatings);
      }));

      it('should not extend data points at the start', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];
        let pingpongRatings: Rating[] = [
          {game: GameType.PINGPONG, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.PINGPONG, rating: 1100, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);

        expect(result.foosball).toEqual(foosballRatings);
        expect(result.pingpong).toEqual(pingpongRatings);
      }));

      it('should not add any data points for a game with no games played', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];
        let pingpongRatings: Rating[] = [];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);

        expect(result.foosball).toEqual(foosballRatings);
        expect(result.pingpong).toEqual(pingpongRatings);
      }));

      it('should take most recent score of day', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        let foosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];

        let expectedFoosballRatings: Rating[] = [
          {game: GameType.FOOSBALL, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00'},
          {game: GameType.FOOSBALL, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00'},
        ];

        let pingpongRatings: Rating[] = [];

        let result = service.aggregate('day', foosballRatings, pingpongRatings);

        expect(result.foosball).toEqual(expectedFoosballRatings);
        expect(result.pingpong).toEqual(pingpongRatings);
      }));

    });
  });
});
