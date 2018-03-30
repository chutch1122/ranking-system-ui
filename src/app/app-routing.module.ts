import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSubmissionPageComponent } from "./game-submission-page/game-submission-page.component";
import { LeaderboardPageComponent } from "./leaderboard-page/leaderboard-page.component";

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
    path: 'games/create',
    component: GameSubmissionPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
