import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Player } from "../models/player.model";
import { NotificationService } from "../notification.service";
import { PlayerService } from "../player.service";
import { SubmitPlayerRequest } from "../requests/submit-player.request";

@Component({
  selector: 'app-player-submission',
  templateUrl: './player-submission.component.html',
  styleUrls: ['./player-submission.component.scss']
})
export class PlayerSubmissionComponent implements OnInit {
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  existingPlayers: Player[] = [];
  form: FormGroup;

  constructor(private playerService: PlayerService,
              private notificationService: NotificationService,
              private router: Router) {
  }

  ngOnInit() {
    this.playerService.all()
      .do(x => this.existingPlayers = x)
      .subscribe();

    this.firstNameControl = new FormControl(null, Validators.required);
    this.lastNameControl = new FormControl(null, Validators.required);

    this.form = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl
    });
  }

  submit() {
    if (!this.form.valid) {
      this.notificationService.notify('Please fill out all required fields before submitting.');
      return;
    }

    if (this.checkForMeme('leeroy', 'jenkins', 'Really?')) return;
    if (this.checkForMeme('a', 'cat', 'meow')) return;
    if (this.checkForMeme('a', 'dog', 'woof woof bork bork')) return;

    if (this.existingPlayers.filter(
      x => x.firstName === this.firstNameControl.value
        && x.lastName === this.lastNameControl.value).length > 0
    ) {
      this.notificationService.notify('Entered player already exists in system.');
      return;
    }

    let request: SubmitPlayerRequest = {
      firstName: this.firstNameControl.value,
      lastName: this.lastNameControl.value
    };

    this.playerService.submit(request)
      .do(
        success => {
          this.notificationService.notify('New player submitted!');
          this.form.reset();
          this.router.navigate(['/leaderboards']);
        },
        error => this.notificationService.notify('Something went wrong submitting your game.')
      )
      .subscribe();
  }

  private checkForMeme(first:string, last:String, message:string): boolean {
    if (this.firstNameControl.value.toLowerCase() === first.toLowerCase() && this.lastNameControl.value.toLowerCase() === last.toLowerCase()) {
      this.notificationService.notify(message);
      return true;
    }

    return false;
  }

}
