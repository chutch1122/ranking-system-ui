import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tabs = [
    {label: 'Leaderboards', link: '/leaderboards'},
    {label: 'Game Submission', link: '/games/create'},
    // {label: 'Player Registration', link: '/players/create'},
  ];
}
