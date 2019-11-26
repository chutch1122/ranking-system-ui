import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tabs = [
    {label: 'Leaderboards', link: '/leaderboards'},
    {label: 'Recent Games', link: '/games'},
    {label: 'Game Submission', link: '/games/create'},
    {label: 'Player Registration', link: '/players/create'},
    {label: 'Game Configuration', link: '/games/configure'},
  ];
}
