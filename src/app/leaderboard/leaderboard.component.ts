import { Component, Input, OnInit } from '@angular/core';
import 'rxjs/add/operator/do';
import { GameType } from '../models/game-type.model';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() game: GameType;

  @Input() set players(data: Player[]) {
    const filtered = data.filter(x => {
      const matching = x.ratings
        .map(x => x.game)
        .filter(x => x === this.game);

      return matching.length === 1;
    });

    const sorted: Player[] = filtered
      .sort((a, b) => {
        const aIndex = a.ratings.map(x => x.game).indexOf(this.game);
        const bIndex = b.ratings.map(x => x.game).indexOf(this.game);

        const aRating = a.ratings[aIndex].rating;
        const bRating = b.ratings[bIndex].rating;

        return bRating - aRating;
      });

    this.data = [];
    for (let i = 0; i < sorted.length; i++) {
      const player = sorted[i];
      const playerName = player.firstName + ' ' + player.lastName;
      const ratingIndex = player.ratings.map(x => x.game).indexOf(this.game);
      const rating = player.ratings[ratingIndex].rating;
      const delta = player.ratings[ratingIndex].delta;

      this.data.push({
        rank: i + 1,
        playerId: player.id,
        name: playerName,
        rating: rating,
        delta: delta
      });
    }
  }

  data: LeaderboardRow[];
  displayedColumns = ['rank', 'name', 'rating', 'delta'];

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
}
