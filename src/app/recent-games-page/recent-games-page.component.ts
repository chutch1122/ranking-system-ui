import { Component, OnInit } from '@angular/core';
import "rxjs/add/operator/do";
import { GameService } from "../game.service";
import { Foosball, GameType, PingPong } from "../models/game-type.model";
import { Game } from "../models/game.model";

@Component({
  selector: 'app-recent-games-page',
  templateUrl: './recent-games-page.component.html',
  styleUrls: ['./recent-games-page.component.scss']
})
export class RecentGamesPageComponent implements OnInit {
  games: GameType[] = GameService.GAME_TYPES;
  foosballGames: Game[] = [];
  pingpongGames: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.recent(new Foosball())
      .do(x => this.foosballGames = x)
      .subscribe();
    this.gameService.recent(new PingPong())
      .do(x => this.pingpongGames = x)
      .subscribe();
  }

}
