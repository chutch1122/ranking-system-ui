import { GameType } from './game-type.model';

export interface Rating {
  game: GameType;
  rating: number;
  delta: number;
  createdOn: string;
  streak: number;
}
