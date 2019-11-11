import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../environments/environment';
import {GameType} from './models/gametype.model';

@Injectable()
export class GameTypeService {
  constructor(private http: HttpClient) {
  }

  getAllGameTypes(): Observable<GameType[]> {
    return this.http.get<GameType[]>(environment.apiUrl + `/game-types`);
  }
}
