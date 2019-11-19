import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/do';
import {Player} from '../models/player.model';
import {PlayerService} from '../player.service';
import {GameType} from '../models/game-type.model';
import {GameTypeService} from '../game-type.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.scss']
})
export class LeaderboardPageComponent implements OnInit {
  gameTypes: GameType[];

  players: Player[] = [];

  constructor(
    private playerService: PlayerService,
    private gameTypeService: GameTypeService
  ) {
  }

  ngOnInit() {
    let observables = [
      this.gameTypeService.getAllGameTypes(),
      this.playerService.all()
    ];

    Observable.forkJoin(observables)
      .subscribe(x => {
        this.gameTypes = x[0];
        this.players = x[1];
      });
  }
}
