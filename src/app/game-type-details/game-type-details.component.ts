import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { GameType } from '../models/game-type.model';
import { Game } from '../models/game.model';
import { PlayerStat, StatsService } from '../stats.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-game-type-details',
  templateUrl: './game-type-details.component.html',
  styleUrls: ['./game-type-details.component.scss']
})
export class GameTypeDetailsComponent implements OnInit {
  @Input() gameType: GameType;
  @Input() rating: number;
  @Input() playerId: number;
  @Input() games: Game[];
  hasWins = false;

  mostWonAgainst: PlayerStat<number>;

  constructor(private statsService: StatsService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => new BehaviorSubject(+params.get('id')))
      .do(id => this.statsService.findMostPointsWonAgainst(id, this.gameType).subscribe((x) => this.mostWonAgainst = x))
      .subscribe();
    this.cdr.detectChanges();
  }

  getWinLoss(games: Game[]) {
    if (games.length === 0) {
      return 'N/A';
    }

    let wins = 0;
    games.filter(x => x.winningTeam === 'TEAM_A' && x.teamA.map(y => y.id).indexOf(this.playerId) !== -1).forEach(() => wins++);

    const percentile = wins / games.length;
    this.hasWins = percentile > 0;
    return wins + '/' + games.length + ' (' + (percentile * 100).toFixed(2) + '%)';
  }
}
