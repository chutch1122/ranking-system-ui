import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/do';
import {GameService} from '../game.service';
import {Game} from '../models/game.model';
import {GameType} from '../models/gametype.model';
import {GameTypeService} from '../gametype.service';

@Component({
  selector: 'app-recent-games-page',
  templateUrl: './recent-games-page.component.html',
  styleUrls: ['./recent-games-page.component.scss']
})
export class RecentGamesPageComponent implements OnInit {
  gameTypes: GameType[];
  gameTypeToGames = new Map<string, Game[]>();

  constructor(
    private gameService: GameService,
    private gameTypeService: GameTypeService
  ) {
  }

  ngOnInit() {
    this.gameTypeService.getAllGameTypes().subscribe(x => {
      this.gameTypes = x;

      this.gameTypes.forEach(x => {
        this.gameTypeToGames.set(x.typeName, []);
      });

      this.gameTypes.forEach(type => {
        this.gameService.recent(type.typeName)
          .do(x => this.setGamesList(type.typeName, x))
          .subscribe();
      });
    });
  }

  setGamesList(type: string, games: Game[]) {
    if (games === undefined) {
      games = [];
    }

    this.gameTypeToGames.set(type, games);
  }
}
