import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-streak',
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss']
})
export class StreakComponent {
  @Input() value: string;

  get isCold(): boolean {
    return this.value === '❄';
  }

  get isFrozen(): boolean {
    return this.value == '☃';
  }

  get isHot(): boolean {
    return this.value == '🔥';
  }

  get isVeryHot(): boolean {
    return this.value == '💥';
  }

  get neutral(): boolean {
    return this.value == '😐';
  }
}
