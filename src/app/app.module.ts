import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FusionChartsModule} from 'angular4-fusioncharts';

import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {GameListComponent} from './game-list/game-list.component';
import {GameSubmissionPageComponent} from './game-submission-page/game-submission-page.component';
import {GameService} from './game.service';
import {LeaderboardPageComponent} from './leaderboard-page/leaderboard-page.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {NotificationService} from './notification.service';
import {NumericStoplightComponent} from './numeric-stoplight/numeric-stoplight.component';
import {PlayerDetailsPageComponent} from './player-details-page/player-details-page.component';
import {PlayerRatingGraphComponent} from './player-rating-graph/player-rating-graph.component';
import {PlayerSubmissionComponent} from './player-submission/player-submission.component';
import {PlayerService} from './player.service';
import {RatingAggregatorService} from './rating-aggregator.service';
import {RecentGamesPageComponent} from './recent-games-page/recent-games-page.component';
import {StatsService} from './stats.service';
import {MostPointsWonAgainstPipe} from './most-points-won-against.pipe';
import {GameTypeDetailsComponent} from './game-type-details/game-type-details.component';
import {StreakComponent} from './streak/streak.component';
import {StreakPipe} from './streak.pipe';
import {GameTypeService} from './game-type.service';
import {GameConfigurationComponent} from './game-configuration/game-configuration.component';
import { SeasonConfigurationComponent } from './season-configuration/season-configuration.component';

FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);


@NgModule({
  declarations: [
    AppComponent,
    GameSubmissionPageComponent,
    LeaderboardPageComponent,
    LeaderboardComponent,
    PlayerSubmissionComponent,
    GameListComponent,
    RecentGamesPageComponent,
    NumericStoplightComponent,
    PlayerDetailsPageComponent,
    PlayerRatingGraphComponent,
    MostPointsWonAgainstPipe,
    GameTypeDetailsComponent,
    StreakComponent,
    StreakPipe,
    GameConfigurationComponent,
    SeasonConfigurationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    NgxChartsModule,
    FusionChartsModule,
    MatPaginatorModule,
    MatTooltipModule,
  ],
  providers: [
    NotificationService,
    PlayerService,
    GameService,
    RatingAggregatorService,
    StatsService,
    MostPointsWonAgainstPipe,
    GameTypeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
