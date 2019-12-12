import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/do';
import {GameService} from '../game.service';
import {Game} from '../models/game.model';
import {GameType} from '../models/game-type.model';
import {GameTypeService} from '../game-type.service';

@Component({
  selector: 'app-recent-games-page',
  templateUrl: './recent-games-page.component.html',
  styleUrls: ['./recent-games-page.component.scss']
})
export class RecentGamesPageComponent implements OnInit {
  gameTypes: GameType[];
  gameTypeToGames = new Map<string, Game[]>();
  oddNumberOfGames = false;

  constructor(
    private gameService: GameService,
    private gameTypeService: GameTypeService
  ) {
  }

  ngOnInit() {
    this.gameTypeService.getAllGameTypes().subscribe(x => {
      this.gameTypes = x;
      this.oddNumberOfGames = this.gameTypes.length % 2 !== 0;

      this.gameTypes.forEach(x => {
        this.gameTypeToGames.set(x.typeName, []);
      });

      this.gameTypes.forEach(type => {
        this.gameService.recent(type.typeName)
          .do(x => this.setGamesList(type.typeName, type.season, x))
          .subscribe();
      });
    });
  }

  setGamesList(type: string, season: number, games: Game[]) {
    if (games === undefined) {
      games = [];
    }

    let filteredGames = games.filter(x => x.seasonNumber === season);

    this.gameTypeToGames.set(type, filteredGames);
  }

  hasGames(type: string): boolean {
    return this.gameTypeToGames.get(type).length > 0;
  }
}
