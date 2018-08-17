import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameType } from './models/game-type.model';
import { Observable } from 'rxjs/Observable';
import { Player } from './models/player.model';
import { environment } from '../environments/environment';

export class PlayerStat<T> {
  player: Player;
  stat: T;
}

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) {
  }

  findMostPointsWonAgainst(playerId: number, gameType: GameType): Observable<PlayerStat<number>> {
    return this.http.get<PlayerStat<number>>(environment.apiUrl + `/stats/most-points-won-against/${playerId}/${gameType}`);
  }
}
