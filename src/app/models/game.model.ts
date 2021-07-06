import {Player} from './player.model';

export interface Game {
  id: number;
  seasonNumber: number;
  gameType: string;
  teamA: Player[];
  teamB: Player[];
  winningTeam: string;
  losingTeam: string;
}
