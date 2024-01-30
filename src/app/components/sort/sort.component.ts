import { Component, EventEmitter, Input, Output } from '@angular/core';

import {
  faLongArrowAltRight,
  faSortAlphaUp,
  faSortAlphaDown,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent {
  @Output() sortUp: EventEmitter<void> = new EventEmitter();
  @Output() sortDown: EventEmitter<void> = new EventEmitter();

  right = faLongArrowAltRight;
  up = faSortAlphaUp;
  down = faSortAlphaDown;

  sortAsc() {
    this.sortUp.emit();
  }

  sortDesc() {
    this.sortDown.emit();
  }
}
