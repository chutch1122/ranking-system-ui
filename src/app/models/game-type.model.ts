export interface GameType {
  enum: string;
  name: string;
}

export class Foosball implements GameType{
  enum = 'FOOSBALL';
  name = 'Foosball';
}

export class PingPong implements GameType{
  enum = 'PINGPONG';
  name = 'Ping Pong';
}
