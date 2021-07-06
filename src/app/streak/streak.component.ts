import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss']
})
export class StreakComponent {
  @Input() value: number;

  get isCold(): boolean {
    return this.value <= -3 && !this.isFrozen;
  }

  get isFrozen(): boolean {
    return this.value <= -5;
  }

  get isHot(): boolean {
    return this.value >= 3 && !this.isVeryHot;
  }

  get isVeryHot(): boolean {
    return this.value >= 5;
  }

  get neutral(): boolean {
    return this.value > -3 && this.value < 3;
  }
}
