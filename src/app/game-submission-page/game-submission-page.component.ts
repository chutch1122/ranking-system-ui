import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/do';
import {GameService} from '../game.service';
import {Player} from '../models/player.model';
import {NotificationService} from '../notification.service';
import {PlayerService} from '../player.service';
import {SubmitGameRequest} from '../requests/submit-game.request';
import {GameTypeService} from '../game-type.service';
import {GameType} from '../models/game-type.model';

@Component({
  selector: 'app-game-submission-page',
  templateUrl: './game-submission-page.component.html',
  styleUrls: ['./game-submission-page.component.scss']
})
export class GameSubmissionPageComponent implements OnInit {
  gameTypes : GameType[];

  players: Player[];
  gameControl: FormControl;
  winningTeamControl: FormControl;
  form: FormGroup;

  firstTeam: FormArray = new FormArray([]);
  secondTeam: FormArray = new FormArray([]);

  constructor(private playerService: PlayerService,
              private gameService: GameService,
              private notificationService: NotificationService,
              private router: Router,
              private gameTypeService: GameTypeService
  ) {
  }

  ngOnInit() {
    this.gameControl = new FormControl(null, Validators.required);
    this.winningTeamControl = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      game: this.gameControl,
      firstTeam: this.firstTeam,
      secondTeam: this.secondTeam,
      winningTeam: this.winningTeamControl,
    });

    this.playerService.all()
      .do(x => {
        this.players = x.sort((a, b) => {
          const aName = a.firstName + ' ' + a.lastName;
          const bName = b.firstName + ' ' + b.lastName;
          return aName.localeCompare(bName);
        });
      })
      .subscribe();

    this.gameTypeService.getAllGameTypes().subscribe(x => this.gameTypes = x);
  }

  submit() {
    const players = new Set([]);
    let firstTeamPlayers: number[] = [];
    let secondTeamPlayers: number[] = [];

    this.firstTeam.controls.forEach(control => {
      players.add(control.value);
      firstTeamPlayers.push(control.value);
    });

    this.secondTeam.controls.forEach(control => {
      players.add(control.value);
      secondTeamPlayers.push(control.value);
    });

    if (!this.form.valid) {
      this.notificationService.notify('Please fill out all required fields before submitting.');
      return;
    }

    let gameType: GameType = this.gameControl.value;

    let totalPlayerCount = gameType.firstTeamSize + gameType.secondTeamSize;
    if (players.size !== (totalPlayerCount)) {
      this.notificationService.notify('Please enter '+ totalPlayerCount +' distinct players in the form.');
      return;
    }

    const request = this.generateRequest(firstTeamPlayers, secondTeamPlayers);

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

  private generateRequest(firstTeamPlayers: number[], secondTeamPlayers: number[]) {
    let winningTeamValue = this.winningTeamControl.value;
    let winningTeam: number[] = [];
    let losingTeam: number[] = [];

    if (winningTeamValue === 'FIRST_TEAM') {
      winningTeam = firstTeamPlayers;
      losingTeam = secondTeamPlayers;
    } else {
      winningTeam = secondTeamPlayers;
      losingTeam = firstTeamPlayers;
    }

    const request: SubmitGameRequest = {
      gameType: this.gameControl.value.typeName,
      teamA: winningTeam,
      teamB: losingTeam,
      winningTeam: 'TEAM_A'
    };
    return request;
  }

  populateFormArrayLengths() {
    this.firstTeam = new FormArray([]);
    this.secondTeam = new FormArray([]);

    this.firstTeam.clearValidators();
    this.secondTeam.clearValidators();

    let firstTeamSize: number = this.gameControl.value.firstTeamSize;
    let secondTeamSize: number = this.gameControl.value.secondTeamSize;

    for(let i = 0; i < firstTeamSize; i++) {
      this.firstTeam.push(new FormControl(null, Validators.required));
    }

    for(let i = 0; i < secondTeamSize; i++) {
      this.secondTeam.push(new FormControl(null, Validators.required));
    }

  }

  inputMasking() {
    return this.gameControl.value === null
    || this.gameControl.value === undefined
    || this.gameControl.value === '';
  }
}
