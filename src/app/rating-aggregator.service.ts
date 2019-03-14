import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Rating } from './models/rating.model';
import { GAME_TYPES } from './models/game-type.model';

type Moment = moment.Moment;

@Injectable()
export class RatingAggregatorService {
  gameTypes = GAME_TYPES;

  constructor() {
  }

  aggregate(type: string, ratingsByGameType: Map<string, Rating[]>): AggregatedRatings {
    const dates = this.getDistinctDates(ratingsByGameType);
    let result = new Map<string, Rating[]>();
    this.gameTypes.forEach(x => {
      result.set(x.toString(), []);
    });

    this.gameTypes.forEach(type => {
      result.set(type.toString(), this.fillRatingsForGame(dates, ratingsByGameType.get(type.toString())));
    });

    return {gameTypeToRatings: result};
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
          createdOn: newDateString.substr(0, newDateString.indexOf('.')),
          streak: lastRating.streak
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
            createdOn: newDateString.substr(0, newDateString.indexOf('.')),
            streak: lastRating.streak
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

  private getDistinctDates(gameRatingSets: Map<string, Rating[]>) {
    const datesSet: Set<string> = new Set<string>();

    for (const ratings of Array.from(gameRatingSets.values())) {
      ratings.forEach(x => datesSet.add(x.createdOn));
    }

    return Array.from(datesSet).map(x => moment.utc(x)).sort((a, b) => a.isBefore(b) ? -1 : 1);
  }
}

export class AggregatedRatings {
  gameTypeToRatings = new Map<string, Rating[]>();
}
