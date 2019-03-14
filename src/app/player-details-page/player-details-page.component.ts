import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/zip';
import { GameService } from '../game.service';
import { GAME_TYPES, GameType } from '../models/game-type.model';
import { Game } from '../models/game.model';
import { Player } from '../models/player.model';
import { PlayerService } from '../player.service';
import { AggregatedRatings, RatingAggregatorService } from '../rating-aggregator.service';

@Component({
  selector: 'app-player-details-page',
  templateUrl: './player-details-page.component.html',
  styleUrls: ['./player-details-page.component.scss']
})
export class PlayerDetailsPageComponent implements OnInit {
  gameTypes: GameType[] = GAME_TYPES;
  gameTypeToGames = new Map<string, Game[]>();
  aggregatedRatings: AggregatedRatings;

  player: Player;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private ratingAggregatorService: RatingAggregatorService,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.gameTypes.forEach(x => {
      this.gameTypeToGames.set(x.toString(), []);
    });
    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.playerService.find(+params.get('id'));
      })
      .do(player => this.player = player)
      .switchMap(x => this.playerService.findRatingsByPlayer(x.id))
      .do(ratings => this.aggregatedRatings = this.ratingAggregatorService.aggregate('day', ratings))
      .subscribe();

    this.route.paramMap
      .switchMap((params: ParamMap) => {
        return this.gameService.findByPlayerId(+params.get('id'));
      })
      .do(games => games.reverse())
      .do(games => {
        this.gameTypes.forEach(type => this.gameTypeToGames.set(type.toString(), games.filter(game => game.gameType === type)));
      })
      .subscribe();
  }

  getRating(gameType: GameType): number {
    const matching = this.player.ratings.filter(x => x.game === gameType);

    if (matching.length === 0) {
      return 0;
    }

    return matching[0].rating;
  }

  hasRating(gameType: GameType): boolean {
    return this.player.ratings.filter(x => x.game === gameType).length !== 0;
  }

  getGamesForType(type: GameType): Game[] {
    return this.gameTypeToGames.get(type.toString());
  }

  getTypesPlayerHasGamesFor(): GameType[] {
    return GAME_TYPES.filter(x => this.gameTypeToGames.get(x.toString()).length > 0);
  }
}
