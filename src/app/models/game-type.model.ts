export enum GameType {
  FOOSBALL = 'FOOSBALL',
  PINGPONG = 'PINGPONG',
}

export const GAME_TYPES: GameType[] = [GameType.FOOSBALL, GameType.PINGPONG];


// TODO: When adding a new game type:
// Add to the enum here
// Add to game-type.pipe.ts
// Add to player-details-page.component.ts --> This can probably be generified further and removed from here
// Add to backend enum in GameType.java
