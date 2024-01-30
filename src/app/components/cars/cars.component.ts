import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Car } from 'src/app/interface/car/car.interface';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css'],
})
export class CarsComponent {
  @Input() cars!: Car;

  @Output() removeCar: EventEmitter<Car> = new EventEmitter();
  @Output() updateCar: EventEmitter<Car> = new EventEmitter();

  edit = faEdit;
  delete = faTrash;

  deleteCar(car: Car) {
    this.removeCar.emit(car);
  }

  editCar(car: Car) {
    this.updateCar.emit(car);
  }
}
