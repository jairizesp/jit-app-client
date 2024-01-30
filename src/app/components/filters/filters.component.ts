import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  @Input() carMake!: { make: string }[];
  @Input() carModel!: { model: string }[];
  @Input() carYear!: { year: number }[];
  @Input() isRequestComplete!: boolean;
  @Input() isFilterHidden!: boolean;

  make!: string | undefined;
  model!: string | undefined;
  year!: number | undefined;
  from!: number | undefined;
  to!: number | undefined;

  @Output() filters: EventEmitter<{
    make?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
  }> = new EventEmitter();

  @Output() selectedMake: EventEmitter<string> = new EventEmitter();

  makeOnChange(value: string) {
    this.selectedMake.emit(value);
  }

  applyFilters() {
    this.filters.emit({
      make: this.make,
      model: this.model,
      year: this.year,
      from: this.from,
      to: this.to,
    });
  }

  clearFilters() {
    this.make = undefined;
    this.model = undefined;
    this.year = undefined;
    this.from = undefined;
    this.to = undefined;
  }
}
