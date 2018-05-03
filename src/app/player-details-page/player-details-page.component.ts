import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/zip";
import "rxjs/add/operator/do";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/zip";
import { Observable } from "rxjs/Observable";
import { GameService } from "../game.service";
import { GAME_TYPES, GameType } from "../models/game-type.model";
import { Game } from "../models/game.model";
import { Player } from "../models/player.model";
import { PlayerService } from "../player.service";
import { AggregatedRatings, RatingAggregatorService } from "../rating-aggregator.service";

@Component({
  selector: 'app-player-details-page',
  templateUrl: './player-details-page.component.html',
  styleUrls: ['./player-details-page.component.scss']
})
export class PlayerDetailsPageComponent implements OnInit {
  gameType = GameType;
  gameTypes = GAME_TYPES;

  player: Player;
  foosballGames: Game[] = [];
  pingpongGames: Game[] = [];

  aggregatedRatings: AggregatedRatings;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private ratingAggregatorService: RatingAggregatorService,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.playerService.find(+params.get('id'));
      })
      .do(player => this.player = player)
      .do(player => {
        Observable.zip(
          this.playerService.findRatings(player.id, GameType.FOOSBALL),
          this.playerService.findRatings(player.id, GameType.PINGPONG),
          (foosballRatings, pingPongRatings) => ({
            foosballRatings, pingPongRatings
          })
        ).subscribe(x => {
          this.aggregatedRatings = this.ratingAggregatorService.aggregate('day', x.foosballRatings, x.pingPongRatings);
        });
      })
      .subscribe();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.gameService.findByPlayerId(+params.get('id'));
      })
      .do(games => {
        this.foosballGames = games.filter(game => game.gameType == GameType.FOOSBALL);
        this.pingpongGames = games.filter(game => game.gameType == GameType.PINGPONG);
      })
      .subscribe();
  }

  getWinLoss(games: Game[]) {
    if (games.length == 0) {
      return "N/A";
    }

    let wins = 0;
    games.filter(x => x.winningTeam == 'TEAM_A' && x.teamA.map(x => x.id).indexOf(this.player.id) != -1).forEach(() => wins++);

    let percentile = wins / games.length;
    return wins + "/" + games.length + " (" + (percentile * 100).toFixed(2) + "%)";
  }

  getRating(gameType:GameType): number {
    let matching = this.player.ratings.filter(x => x.game == gameType);

    if (matching.length == 0) return 0;

    return matching[0].rating;
  }

  hasRating(gameType:GameType):boolean {
    return this.player.ratings.filter(x => x.game == gameType).length != 0;
  }

  getGamesForType(type: GameType): Game[] {
    if (type == GameType.FOOSBALL) {
      return this.foosballGames;
    }

    return this.pingpongGames;
  }
}
