import {Component, Input} from '@angular/core';
import * as moment from 'moment';
import {Optional} from '../helpers';
import {GameType} from '../models/game-type.model';
import {Rating} from '../models/rating.model';
import {SeriesEntry} from '../models/series-entry.model';
import {AggregatedRatings} from '../rating-aggregator.service';

@Component({
  selector: 'app-player-rating-graph',
  templateUrl: './player-rating-graph.component.html',
  styleUrls: ['./player-rating-graph.component.scss']
})
export class PlayerRatingGraphComponent {
  @Input() set aggregatedRatings(value: AggregatedRatings) {
    if (value == null) {
      this.data = [];
      return;
    }

    this.data = this.buildDataObject(value);
  }

  @Input() gameTypes: GameType[];

  data: any;
  xAxisLabel = 'Date';
  yAxisLabel = 'Rating';

  private buildDataObject(aggregatedRatings: AggregatedRatings): any[] {
    const result = [];

    if (!this.gameTypes) {
      console.error('Initialized without game types!');
      return;
    }

    this.gameTypes.forEach(type => {
      this.buildSeriesIfPresent(aggregatedRatings.gameTypeToRatings.get(type.typeName), type)
        .ifPresent(x => result.push(x));
    });

    return result;
  }

  private buildSeriesIfPresent(ratings: Rating[], gameType: GameType): Optional<any> {
    if (ratings.length === 0) {
      return Optional.empty();
    }

    return Optional.of({
      'name': gameType.displayValue,
      'series': ratings.map(x => <SeriesEntry>{
        name: moment.utc(x.createdOn).format('MM-DD-YYYY'),
        value: x.rating
      })
    });
  }
}
