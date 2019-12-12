import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {GameType} from './models/game-type.model';
import {SubmitGameTypeRequest} from './requests/submit-game-type.request';

@Injectable()
export class GameTypeService {
  constructor(private http: HttpClient) {
  }

  getAllGameTypes(): Observable<GameType[]> {
    return this.http.get<GameType[]>(environment.apiUrl + `/game-types`);
  }

  createGameType(request: SubmitGameTypeRequest): Observable<GameType> {
    return this.http.post<GameType>(environment.apiUrl + `/game-types`, request);
  }

  incrementSeason(gameType: string): Observable<any> {
    return this.http.put(environment.apiUrl + `/game-types/season-increment/${gameType}`, null);
  }
}
