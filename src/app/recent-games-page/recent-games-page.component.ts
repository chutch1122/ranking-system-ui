import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/do';
import { GameService } from '../game.service';
import { GAME_TYPES } from '../models/game-type.model';
import { Game } from '../models/game.model';

@Component({
  selector: 'app-recent-games-page',
  templateUrl: './recent-games-page.component.html',
  styleUrls: ['./recent-games-page.component.scss']
})
export class RecentGamesPageComponent implements OnInit {
  gameTypes = GAME_TYPES;
  gameTypeToGames = new Map<string, Game[]>();

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameTypes.forEach(x => {
      this.gameTypeToGames.set(x.toString(), []);
    });

    this.gameTypes.forEach(type => {
      this.gameService.recent(type.toString())
        .do(x => this.setGamesList(type.toString(), x))
        .subscribe();
    });
  }

  setGamesList(type: string, games: Game[]) {
    if (games === undefined) {
      games = [];
    }

    this.gameTypeToGames.set(type, games);
  }
}
