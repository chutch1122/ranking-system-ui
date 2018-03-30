import { Component, Input, OnInit } from '@angular/core';
import "rxjs/add/operator/do";
import { GameType } from "../models/game-type.model";
import { Player } from "../models/player.model";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
  @Input() game: GameType;

  @Input() set players(data: Player[]) {
    let filtered = data.filter(x => {
      let matching = x.ratings
        .map(x => x.game)
        .filter(x => x === this.game.enum);

      return matching.length === 1;
    });

    let sorted: Player[] = filtered
      .sort((a, b) => {
        let aIndex = a.ratings.map(x => x.game).indexOf(this.game.enum);
        let bIndex = b.ratings.map(x => x.game).indexOf(this.game.enum);

        let aRating = a.ratings[aIndex].rating;
        let bRating = b.ratings[bIndex].rating;

        return bRating - aRating;
      });

    this.data = [];
    for (let i = 0; i < sorted.length; i++) {
      let player = sorted[i];
      let playerName = player.firstName + ' ' + player.lastName;
      let ratingIndex = player.ratings.map(x => x.game).indexOf(this.game.enum);
      let rating = player.ratings[ratingIndex].rating;

      this.data.push({
        rank: i + 1,
        playerId: player.id,
        name: playerName,
        rating: rating
      });
    }
  }

  data: LeaderboardRow[];
  displayedColumns = ['rank', 'name', 'rating'];

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
}
