import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { GameType } from "./models/game-type.model";
import { Player } from "./models/player.model";
import { Rating } from "./models/rating.model";
import { SubmitPlayerRequest } from "./requests/submit-player.request";

@Injectable()
export class PlayerService {

  constructor(private http: HttpClient) {
  }

  all(): Observable<Player[]> {
    return this.http.get<Player[]>(environment.apiUrl + '/players');
  }

  submit(request: SubmitPlayerRequest) {
    return this.http.post(environment.apiUrl + '/players', request);
  }

  find(playerId: number): Observable<Player> {
    return this.http.get<Player>(environment.apiUrl + '/players/' + playerId);
  }

  findRatings(playerId: number, type:GameType): Observable<Rating[]> {
    return this.http.get<Rating[]>(environment.apiUrl + '/players/' + playerId + '/ratings/' + type);
  }
}
