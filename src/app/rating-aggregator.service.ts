import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Rating } from './models/rating.model';
import {Game} from './models/game.model';
import {GAME_TYPES} from './models/game-type.model';

type Moment = moment.Moment;

@Injectable()
export class RatingAggregatorService {

  constructor() {
  }

  aggregate(type: string, ...gameRatingSets: Rating[][]): AggregatedRatings {
    const dates = this.getDistinctDates(gameRatingSets);
    let gameTypeToGameRatingSets = new Map<string, Rating[]>();
    GAME_TYPES.forEach(x => {gameTypeToGameRatingSets.set(x.toString(), [])});

    gameRatingSets.forEach(set => {
      set.forEach(rating => {
        gameTypeToGameRatingSets.set(
          rating.game.toString(),
          gameTypeToGameRatingSets.get(rating.game.toString()).concat(rating)
        );
      })
    });

    GAME_TYPES.forEach(type => {
      gameTypeToGameRatingSets.set(type.toString(), this.fillRatingsForGame(dates, gameTypeToGameRatingSets.get(type.toString())))
    });

    return {gameTypeToRatings: gameTypeToGameRatingSets};
  }

  private fillRatingsForGame(dates: Moment[], ratings: Rating[]) {
    if (ratings.length === 0) {
      return [];
    }

    const result: Rating[] = [];
    const lastDateForRatings: Moment = moment.utc(ratings[ratings.length - 1].createdOn);

    let lastRating: Rating = null;
    for (const date of dates) {
      if (date.isAfter(lastDateForRatings)) {
        const newDateString = date.toISOString();

        lastRating = {
          game: lastRating.game,
          rating: lastRating.rating,
          delta: lastRating.delta,
          createdOn: newDateString.substr(0, newDateString.indexOf('.'))
        };

        result.push(lastRating);
        continue;
      }

      const todayRatings: Rating[] = ratings.filter((value) => moment.utc(value.createdOn).isSame(date));

      if (todayRatings.length === 0) {
        if (lastRating != null) {
          const newDateString = date.toISOString();
          lastRating = {
            game: lastRating.game,
            rating: lastRating.rating,
            delta: lastRating.delta,
            createdOn: newDateString.substr(0, newDateString.indexOf('.'))
          };
          result.push(lastRating);
        }
        continue;
      }

      lastRating = todayRatings[todayRatings.length - 1];
      result.push(lastRating);
    }

    return result;
  }

  private getDistinctDates(gameRatingSets: Rating[][]) {
    const datesSet: Set<string> = new Set<string>();

    for (const ratingSet of gameRatingSets) {
      ratingSet.forEach(x => datesSet.add(x.createdOn));
    }

    return Array.from(datesSet).map(x => moment.utc(x)).sort((a, b) => a.isBefore(b) ? -1 : 1);
  }
}

export class AggregatedRatings {
  gameTypeToRatings = new Map<string, Rating[]>();
}
