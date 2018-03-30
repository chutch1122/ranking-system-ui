import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { environment } from "../environments/environment";
import { Foosball, PingPong } from "./models/game-type.model";
import { SubmitGameRequest } from "./requests/submit-game.request";

@Injectable()
export class GameService {
  public static GAME_TYPES = [
    new Foosball(),
    new PingPong()
  ];

  constructor(private http:HttpClient) { }

  submit(request:SubmitGameRequest):Observable<any> {
    return this.http.post(environment.apiUrl + '/games', request);
  }
}
