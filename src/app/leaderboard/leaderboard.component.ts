import {Component, Input, OnInit} from '@angular/core';
import 'rxjs/add/operator/do';
import {GameType} from '../models/game-type.model';
import {Player} from '../models/player.model';
import * as moment from 'moment';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() game: GameType;

  displayedColumns = ['rank', 'streak', 'name', 'rating', 'delta'];

  data: LeaderboardRow[];

  @Input() set players(data: Player[]) {
    const filtered = data
      .filter(player => {
        const matching = player.ratings
          .map(rating => rating.game)
          .filter(gameTypeName => gameTypeName === this.game.typeName);

        return matching.length === 1;
      })
      .filter(x => {
        const twoMonthsAgo = moment().subtract(2, 'month');
        const mostRecent = moment(x.ratings[0].createdOn);

        return mostRecent.isAfter(twoMonthsAgo);
      });

    const sorted: Player[] = filtered
      .sort((a, b) => {
        const aIndex = a.ratings.map(x => x.game).indexOf(this.game.typeName);
        const bIndex = b.ratings.map(x => x.game).indexOf(this.game.typeName);

        const aRating = a.ratings[aIndex].rating;
        const bRating = b.ratings[bIndex].rating;

        return bRating - aRating;
      });

    this.data = [];
    for (let i = 0; i < sorted.length; i++) {
      const player = sorted[i];
      const playerName = player.firstName + ' ' + player.lastName;
      const ratingIndex = player.ratings.map(x => x.game).indexOf(this.game.typeName);
      const rating = player.ratings[ratingIndex].rating;
      const delta = player.ratings[ratingIndex].delta;
      const streak = player.ratings[ratingIndex].streak;

      this.data.push({
        rank: i + 1,
        playerId: player.id,
        name: playerName,
        rating: rating,
        delta: delta,
        streak: streak
      });
    }

  }

  constructor() {
  }

  ngOnInit() {
  }
}

export class LeaderboardRow {
  rank: number;
  playerId: number;
  name: string;
  rating: number;
  delta: number;
  streak: number;
}
