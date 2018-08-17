import { Pipe, PipeTransform } from '@angular/core';
import { GameType } from './models/game-type.model';

@Pipe({
  name: 'gameType'
})
export class GameTypePipe implements PipeTransform {

  transform(value: GameType, args?: any): any {
    if (value === GameType.PINGPONG) {
      return 'Ping Pong';
    }
    if (value === GameType.FOOSBALL) {
      return 'Foosball';
    }

    return 'Unknown Game Type';
  }
}
