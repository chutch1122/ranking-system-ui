import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule, MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from "@angular/material";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";


import { AppComponent } from './app.component';
import { GameSubmissionPageComponent } from './game-submission-page/game-submission-page.component';
import { GameService } from "./game.service";
import { LeaderboardPageComponent } from "./leaderboard-page/leaderboard-page.component";
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { NotificationService } from "./notification.service";
import { PlayerService } from "./player.service";
import { PlayerSubmissionComponent } from './player-submission/player-submission.component';


@NgModule({
  declarations: [
    AppComponent,
    GameSubmissionPageComponent,
    LeaderboardPageComponent,
    LeaderboardComponent,
    PlayerSubmissionComponent
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
  ],
  providers: [
    NotificationService,
    PlayerService,
    GameService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
