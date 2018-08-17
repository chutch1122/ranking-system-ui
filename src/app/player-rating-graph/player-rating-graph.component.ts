import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GameTypePipe } from '../game-type.pipe';
import { Optional } from '../helpers';
import { GameType } from '../models/game-type.model';
import { Rating } from '../models/rating.model';
import { SeriesEntry } from '../models/series-entry.model';
import { AggregatedRatings } from '../rating-aggregator.service';

@Component({
  selector: 'app-player-rating-graph',
  templateUrl: './player-rating-graph.component.html',
  styleUrls: ['./player-rating-graph.component.scss']
})
export class PlayerRatingGraphComponent implements OnInit {
  @Input() set aggregatedRatings(value: AggregatedRatings) {
    if (value == null) {
      this.data = [];
      return;
    }

    this.data = this.buildDataObject(value);
  }

  data: any;
  xAxisLabel = 'Date';
  yAxisLabel = 'Rating';

  constructor(private gameTypePipe: GameTypePipe) {
  }

  ngOnInit() {
  }

  private buildDataObject(aggregatedRatings: AggregatedRatings): any[] {
    const result = [];

    this.buildSeriesIfPresent(aggregatedRatings.foosball, GameType.FOOSBALL).ifPresent(x => result.push(x));
    this.buildSeriesIfPresent(aggregatedRatings.pingpong, GameType.PINGPONG).ifPresent(x => result.push(x));

    return result;
  }

  private buildSeriesIfPresent(ratings: Rating[], gameType: GameType): Optional<any> {
    if (ratings.length === 0) {
      return Optional.empty();
    }

    return Optional.of({
      'name': this.gameTypePipe.transform(gameType),
      'series': ratings.map(x => <SeriesEntry>{
        name: moment.utc(x.createdOn).format('MM-DD-YYYY'),
        value: x.rating
      })
    });
  }
}
