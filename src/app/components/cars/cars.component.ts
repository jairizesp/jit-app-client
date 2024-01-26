import { Component, Input } from '@angular/core';
import { Car } from 'src/app/interface/car/car.interface';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent {
  @Input() cars!: Car;
}
