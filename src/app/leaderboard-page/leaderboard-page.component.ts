import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/do";
import { GameService } from "../game.service";
import { GameType } from "../models/game-type.model";
import { Player } from "../models/player.model";
import { PlayerService } from "../player.service";

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent implements OnInit {
  games: GameType[] = GameService.GAME_TYPES;
  players: Player[] = [];

  constructor(private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.all()
      .do(x => this.players = x)
      .subscribe();
  }

}
