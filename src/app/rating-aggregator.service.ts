import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Rating } from "./models/rating.model";

type Moment = moment.Moment;

@Injectable()
export class RatingAggregatorService {

  constructor() {
  }

  aggregate(type: string, ...gameRatingSets: Rating[][]): AggregatedRatings {
    let dates = this.getDistinctDates(gameRatingSets);

    let foosballRatings = gameRatingSets[0];
    let pingPongRatings = gameRatingSets[1];

    let resultingFoosballRatings = this.fillRatingsForGame(dates, foosballRatings);
    let resultingPingPongRatings = this.fillRatingsForGame(dates, pingPongRatings);

    return {
      foosball: resultingFoosballRatings,
      pingpong: resultingPingPongRatings
    };
  }

  private fillRatingsForGame(dates: Moment[], ratings: Rating[]) {
    if (ratings.length == 0) return [];

    let result: Rating[] = [];
    let lastDateForRatings: Moment = moment.utc(ratings[ratings.length - 1].createdOn);

    let lastRating: Rating = null;
    for (let date of dates) {
      if (date.isAfter(lastDateForRatings)) {
        let newDateString = date.toISOString();

        lastRating = {
          game: lastRating.game,
          rating: lastRating.rating,
          delta: lastRating.delta,
          createdOn: newDateString.substr(0, newDateString.indexOf('.'))
        };

        result.push(lastRating);
        continue;
      }

      let todayRatings: Rating[] = ratings.filter((value) => moment.utc(value.createdOn).isSame(date));

      if (todayRatings.length == 0) {
        if (lastRating != null) {
          let newDateString = date.toISOString();
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
    let datesSet: Set<string> = new Set<string>();

    for (let ratingSet of gameRatingSets) {
      ratingSet.forEach(x => datesSet.add(x.createdOn));
    }

    return Array.from(datesSet).map(x => moment.utc(x)).sort((a, b) => a.isBefore(b) ? -1 : 1);
  }
}

export class AggregatedRatings {
  foosball: Rating[];
  pingpong: Rating[];
}
