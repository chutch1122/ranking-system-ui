import {Component, OnInit} from '@angular/core';
import {GameType} from '../models/game-type.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameTypeService} from '../game-type.service';
import {NotificationService} from '../notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-season-configuration',
  templateUrl: './season-configuration.component.html',
  styleUrls: ['./season-configuration.component.scss']
})
export class SeasonConfigurationComponent implements OnInit {
  gameTypes: GameType[];
  form: FormGroup;
  gameControl: FormControl;

  constructor(private gameTypeService: GameTypeService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.gameTypeService.getAllGameTypes().subscribe(x => this.gameTypes = x);

    this.gameControl = new FormControl(null, Validators.required);
    this.form = new FormGroup({
      game: this.gameControl,
    });


  }

  submit() {
    if (!this.form.valid) {
      this.notificationService.notify('Please select a game type to start a new season with.');
      return;
    }

    let gameType: GameType = this.gameControl.value;

    this.gameTypeService.incrementSeason(gameType.typeName).do(
      success => {
        this.notificationService.notify('A new season has begun!');
        this.form.reset();
        this.router.navigate(['/leaderboards']);
      },
      error => this.notificationService.notify('Something went wrong submitting your request.')
    )
      .subscribe();
  }

}
