import { Component, Input } from '@angular/core';
import { GameType } from '../models/game-type.model';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() type: GameType;
  @Input() set games(value: Game[]) {
    this._games = value;
    this.pagedGames = value.slice(0, this.pageSizes[0]);
  }

  @Input() playerId: number;

  get games() {
    return this._games;
  }

  pagedGames: Game[];
  pageSizes = [10, 20, 30];

  private _games: Game[] = [];

  getFullName(player: Player): string {
    return player.firstName + ' ' + player.lastName[0] + '.';
  }

  getRatingDelta(player: Player): number {
    return player.ratings.filter(x => x.game === this.type)[0].delta;
  }

  onPageChanged(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    this.pagedGames = this.games.slice(startIndex, startIndex + event.pageSize);
  }

  isWin(index: number): boolean {
    return this.playerId && this.pagedGames[index].teamA.map(x => x.id).some(x => x === this.playerId);
  }

  isLoss(index: number): boolean {
    return this.playerId && this.pagedGames[index].teamB.map(x => x.id).some(x => x === this.playerId);
  }
}
