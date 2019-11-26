import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GameSubmissionPageComponent} from './game-submission-page/game-submission-page.component';
import {LeaderboardPageComponent} from './leaderboard-page/leaderboard-page.component';
import {PlayerDetailsPageComponent} from './player-details-page/player-details-page.component';
import {PlayerSubmissionComponent} from './player-submission/player-submission.component';
import {RecentGamesPageComponent} from './recent-games-page/recent-games-page.component';
import {GameConfigurationComponent} from './game-configuration/game-configuration.component';

const routes: Routes = [
  {
    path: '',
    component: LeaderboardPageComponent
  },
  {
    path: 'leaderboards',
    component: LeaderboardPageComponent
  },
  {
    path: 'games',
    component: RecentGamesPageComponent
  },
  {
    path: 'games/create',
    component: GameSubmissionPageComponent
  },
  {
    path: 'players/create',
    component: PlayerSubmissionComponent
  },
  {
    path: 'players/:id',
    component: PlayerDetailsPageComponent
  },
  {
    path: 'games/configure',
    component: GameConfigurationComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
