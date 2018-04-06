import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Player } from "./models/player.model";
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { SubmitPlayerRequest } from "./requests/submit-player.request";

@Injectable()
export class PlayerService {

  constructor(private http:HttpClient) { }

  all():Observable<Player[]> {
    return this.http.get<Player[]>(environment.apiUrl + '/players');
  }

  submit(request: SubmitPlayerRequest) {
    return this.http.post(environment.apiUrl + '/players', request);
  }
}
