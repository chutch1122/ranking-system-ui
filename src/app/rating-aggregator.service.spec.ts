import {inject, TestBed} from '@angular/core/testing';
import {Rating} from './models/rating.model';

import {RatingAggregatorService} from './rating-aggregator.service';
import {GameType} from './models/gametype.model';

describe('RatingAggregatorService', () => {
  const gameTypes: GameType[] = [
    {
      typeName: 'FOOSBALL',
      displayValue: 'Foosball'
    },
    {
      typeName: 'PINGPONG',
      displayValue: 'Ping Pong'
    }
  ];

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
        const foosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];
        const pingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1200, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1300, delta: -1, createdOn: '2018-04-04T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1400, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];

        const map = new Map<string, Rating[]>([
          ['FOOSBALL', foosballRatings],
          ['PINGPONG', pingpongRatings],
        ]);

        const result = service.aggregate('day', map, gameTypes);

        const expectedFoosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-04T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];

        expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(expectedFoosballRatings);
        expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(pingpongRatings);
      }));

      it('should fill in the gaps for a second game', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        const foosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1200, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1300, delta: -1, createdOn: '2018-04-04T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1400, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];
        const pingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];

        const map = new Map<string, Rating[]>([
          ['FOOSBALL', foosballRatings],
          ['PINGPONG', pingpongRatings],
        ]);

        const result = service.aggregate('day', map, gameTypes);

        const expectedPingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-04T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];

        expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(foosballRatings);
        expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(expectedPingpongRatings);
      }));

      it('should fill in the gaps for both games', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        const foosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1400, delta: -1, createdOn: '2018-04-06T05:00:00', streak: 0},
        ];
        const pingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
        ];

        const map = new Map<string, Rating[]>([
          ['FOOSBALL', foosballRatings],
          ['PINGPONG', pingpongRatings],
        ]);

        const result = service.aggregate('day', map, gameTypes);

        const expectedFoosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1400, delta: -1, createdOn: '2018-04-06T05:00:00', streak: 0},
        ];

        const expectedPingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-05T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-06T05:00:00', streak: 0},
        ];

        expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(expectedFoosballRatings);
        expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(expectedPingpongRatings);
      }));

      it('should extend data points to most recent for both games',
        inject([RatingAggregatorService], (service: RatingAggregatorService) => {
          const foosballRatings: Rating[] = [
            {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
            {game: gameTypes[0].typeName, rating: 9999, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          ];
          const pingPongRatings: Rating[] = [
            {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
            {game: gameTypes[1].typeName, rating: 8888, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          ];

          const map = new Map<string, Rating[]>([
            ['FOOSBALL', foosballRatings],
            ['PINGPONG', pingPongRatings],
          ]);

          const result = service.aggregate('day', map, gameTypes);

          const expectedFoosballRatings: Rating[] = [
            {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
            {game: gameTypes[0].typeName, rating: 9999, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
            {game: gameTypes[0].typeName, rating: 9999, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          ];
          const expectedPingPongRatings: Rating[] = [
            {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
            {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
            {game: gameTypes[1].typeName, rating: 8888, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          ];

          expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(expectedFoosballRatings);
          expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(expectedPingPongRatings);
        }));

      it('should not extend data points at the start', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        const foosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
        ];
        const pingpongRatings: Rating[] = [
          {game: gameTypes[1].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[1].typeName, rating: 1100, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
        ];

        const map = new Map<string, Rating[]>([
          ['FOOSBALL', foosballRatings],
          ['PINGPONG', pingpongRatings],
        ]);

        const result = service.aggregate('day', map, gameTypes);

        expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(foosballRatings);
        expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(pingpongRatings);
      }));

      it('should not add any data points for a game with no games played',
        inject([RatingAggregatorService], (service: RatingAggregatorService) => {
          const foosballRatings: Rating[] = [
            {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-01T05:00:00', streak: 0},
            {game: gameTypes[0].typeName, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
            {game: gameTypes[0].typeName, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
          ];
          const pingpongRatings: Rating[] = [];

          const map = new Map<string, Rating[]>([
            ['FOOSBALL', foosballRatings],
            ['PINGPONG', pingpongRatings],
          ]);

          const result = service.aggregate('day', map, gameTypes);

          expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(foosballRatings);
          expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(pingpongRatings);
        }));

      it('should take most recent score of day', inject([RatingAggregatorService], (service: RatingAggregatorService) => {
        const foosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1000, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
        ];

        const expectedFoosballRatings: Rating[] = [
          {game: gameTypes[0].typeName, rating: 1200, delta: -1, createdOn: '2018-04-02T05:00:00', streak: 0},
          {game: gameTypes[0].typeName, rating: 1300, delta: -1, createdOn: '2018-04-03T05:00:00', streak: 0},
        ];

        const pingpongRatings: Rating[] = [];

        const map = new Map<string, Rating[]>([
          ['FOOSBALL', foosballRatings],
          ['PINGPONG', pingpongRatings],
        ]);

        const result = service.aggregate('day', map, gameTypes);

        expect(result.gameTypeToRatings.get('FOOSBALL')).toEqual(expectedFoosballRatings);
        expect(result.gameTypeToRatings.get('PINGPONG')).toEqual(pingpongRatings);
      }));

    });
  });
});
