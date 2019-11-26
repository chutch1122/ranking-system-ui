import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-numeric-stoplight',
  templateUrl: './numeric-stoplight.component.html',
  styleUrls: ['./numeric-stoplight.component.scss']
})
export class NumericStoplightComponent {
  @Input() value: number;

  get isPositive(): boolean {
    return this.value > -1;
  }
}
