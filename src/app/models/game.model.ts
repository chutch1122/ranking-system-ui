import { GameType } from "./game-type.model";
import { Player } from "./player.model";

export interface Game {
  id: number;
  seasonId: number;
  gameType: GameType,
  teamA: Player[],
  teamB: Player[],
  winningTeam: string;
  losingTeam: string;
}
