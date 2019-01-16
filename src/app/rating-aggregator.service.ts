import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Rating } from './models/rating.model';

type Moment = moment.Moment;

@Injectable()
export class RatingAggregatorService {

  constructor() {
  }

  //TODO: generify similar to player details page, using a map
  aggregate(type: string, ...gameRatingSets: Rating[][]): AggregatedRatings {
    const dates = this.getDistinctDates(gameRatingSets);

    const foosballRatings = gameRatingSets[0];
    const pingPongRatings = gameRatingSets[1];

    const resultingFoosballRatings = this.fillRatingsForGame(dates, foosballRatings);
    const resultingPingPongRatings = this.fillRatingsForGame(dates, pingPongRatings);

    return {
      foosball: resultingFoosballRatings,
      pingpong: resultingPingPongRatings
    };
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

//TODO: Have this class contain a map<string, ratings[]>
export class AggregatedRatings {
  foosball: Rating[];
  pingpong: Rating[];
}
