import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Car } from 'src/app/interface/car/car.interface';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../../services/states/state.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  isEditModalVisible!: boolean;

  edit_success!: boolean;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteCar(car: Car) {
    this.removeCar.emit(car);
  }

  editCar(car: Car) {
    this.stateService.toggleEditModal();
    this.isEditModalVisible = this.stateService.isEditModalVisible;
    this.updateCar.emit(car);
  }

  modalVisible(is_visible: boolean) {
    this.isEditModalVisible = is_visible;
  }

  isUpdateSuccess(is_success: boolean) {
    this.edit_success = is_success;
  }
}
