import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { GameType } from './models/game-type.model';
import { Game } from './models/game.model';
import { SubmitGameRequest } from './requests/submit-game.request';

@Injectable()
export class GameService {
  constructor(private http: HttpClient) {
  }

  submit(request: SubmitGameRequest): Observable<any> {
    return this.http.post(environment.apiUrl + '/games', request);
  }

  recent(gameType: GameType): Observable<Game[]> {
    return this.http.get<Game[]>(environment.apiUrl + `/games/recent/${gameType}`);
  }

  findByPlayerId(playerId: number): Observable<Game[]> {
    return this.http.get<Game[]>(environment.apiUrl + `/players/${playerId}/games`);
  }
}
