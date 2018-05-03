import { Component, Input } from '@angular/core';
import { GameType } from "../models/game-type.model";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent {
  @Input() type: GameType;
  @Input() games: Game[];

  getFullName(player:Player): string {
    return player.firstName + ' ' + player.lastName[0] + '.';
  }

  getRatingDelta(player:Player): number {
    return player.ratings.filter(x => x.game === this.type)[0].delta;
  }
}
