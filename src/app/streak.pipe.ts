import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'streak'
})
export class StreakPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value > -3 && value < 3) {
      return '';
    }

    if (value <= -5) {
      return '☃';
    }

    if (value <= -3) {
      return '❄';
    }

    if (value >= 3) {
      return '🔥';
    }

    if (value >= 5) {
      return '💥';
    }
  }
}
