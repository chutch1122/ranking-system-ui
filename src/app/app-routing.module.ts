import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSubmissionPageComponent } from "./game-submission-page/game-submission-page.component";
import { LeaderboardPageComponent } from "./leaderboard-page/leaderboard-page.component";
import { PlayerSubmissionComponent } from "./player-submission/player-submission.component";
import { RecentGamesPageComponent } from "./recent-games-page/recent-games-page.component";

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
