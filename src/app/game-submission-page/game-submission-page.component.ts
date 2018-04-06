import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import "rxjs/add/operator/do";
import { GameService } from "../game.service";
import { Foosball, GameType } from "../models/game-type.model";
import { Player } from "../models/player.model";
import { NotificationService } from "../notification.service";
import { PlayerService } from "../player.service";
import { SubmitGameRequest } from "../requests/submit-game.request";

@Component({
  selector: 'app-game-submission-page',
  templateUrl: './game-submission-page.component.html',
  styleUrls: ['./game-submission-page.component.scss']
})
export class GameSubmissionPageComponent implements OnInit {
  players: Player[];
  winningTeamPlayer1: FormControl;
  winningTeamPlayer2: FormControl;
  losingTeamPlayer1: FormControl;
  losingTeamPlayer2: FormControl;
  gameControl: FormControl;
  form: FormGroup;

  games: GameType[] = GameService.GAME_TYPES;

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.gameControl = new FormControl('Foosball', Validators.required);
    this.winningTeamPlayer1 = new FormControl(null, Validators.required);
    this.winningTeamPlayer2 = new FormControl(null, Validators.required);
    this.losingTeamPlayer1 = new FormControl(null, Validators.required);
    this.losingTeamPlayer2 = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      game: this.gameControl,
      teamAPlayer1: this.winningTeamPlayer1,
      teamAPlayer2: this.winningTeamPlayer2,
      teamBPlayer1: this.losingTeamPlayer1,
      teamBPlayer2: this.losingTeamPlayer2
    });

    this.playerService.all()
      .do(x => {
        this.players = x.sort((a, b) => {
          let aName = a.firstName + ' ' + a.lastName;
          let bName = b.firstName + ' ' + b.lastName;

          return aName.localeCompare(bName);
        });
      })
      .subscribe();
  }

  submit() {
    let players = new Set([
      this.winningTeamPlayer1.value,
      this.winningTeamPlayer2.value,
      this.losingTeamPlayer1.value,
      this.losingTeamPlayer2.value
    ]);

    if (!this.form.valid) {
      this.notificationService.notify('Please fill out all required fields before submitting.');
      return;
    }

    if (players.size != 4) {
      this.notificationService.notify('Please enter four distinct players in the form.');
      console.log(players);
      return;
    }

    if(this.gameControl.value ){

    }

    let request: SubmitGameRequest = {
      gameType: this.gameControl.value,
      teamA: [this.winningTeamPlayer1.value, this.winningTeamPlayer2.value],
      teamB: [this.losingTeamPlayer1.value, this.losingTeamPlayer2.value],
      winningTeam: 'TEAM_A'
    };

    this.gameService.submit(request)
      .do(
        success => {
          this.notificationService.notify('Your game has been submitted!');
          this.form.reset();
          this.router.navigate(['/leaderboards']);
        },
        error => this.notificationService.notify('Something went wrong submitting your game.')
      )
      .subscribe();
  }

}
