import { Rating } from "./rating.model";

export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  ratings: Rating[];
}
