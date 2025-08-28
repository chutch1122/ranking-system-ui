import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostPointsWonAgainstPipe'
})
export class MostPointsWonAgainstPipe implements PipeTransform {
  values = [
    'destroyed',
    'buried',
    'smashed',
    'eliminated',
    'wrecked',
    'blasted',
    'annihilated',
    'crushed',
    'terminated',
    'dumpstered',
    'beat down',
    'showed who was boss',
    'rekt',
    'finalized',
    'scorched',
    'roasted',
    'burned',
    'totaled'
  ];

  transform(value: any, args?: any): any {
    return this.values[this.randomInt(0, this.values.length - 1)];
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
