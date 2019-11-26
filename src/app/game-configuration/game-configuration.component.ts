import { Component, OnInit } from '@angular/core';
import {GameTypeService} from '../game-type.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NotificationService} from '../notification.service';
import {SubmitGameTypeRequest} from '../requests/submit-game-type.request';

@Component({
  selector: 'app-game-configuration',
  templateUrl: './game-configuration.component.html',
  styleUrls: ['./game-configuration.component.scss']
})
export class GameConfigurationComponent implements OnInit {
  displayValue: FormControl;
  firstTeamSize: FormControl;
  secondTeamSize: FormControl;
  form: FormGroup;

  constructor(
    private gameTypeService: GameTypeService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.displayValue = new FormControl(null, Validators.required);
    this.firstTeamSize = new FormControl(null, Validators.required);
    this.secondTeamSize = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      displayName: this.displayValue,
      firstTeamSize: this.firstTeamSize,
      secondTeamSize: this.secondTeamSize
    })
  }

  submit() {
    if(!this.form.valid) {
      this.notificationService.notify('Please fill out all fields before submitting.');
      return;
    }

    const request: SubmitGameTypeRequest = {
      displayValue: this.displayValue.value,
      firstTeamSize: this.firstTeamSize.value,
      startingSeason: 1,
      secondTeamSize: this.secondTeamSize.value
    };

    this.gameTypeService.createGameType(request).do(
      () => {
        this.notificationService.notify('New game type created!');
        this.form.reset();
        this.router.navigate(['/leaderboards']);
      },
      () => this.notificationService.notify('Something went wrong creating your game type.')
    )
      .subscribe();
  }
}
