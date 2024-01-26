import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();

  make!: string;
  description!: string;
  model!: string;
  year!: number;
  price!: number;

  is_success: boolean = false;

  constructor(private carService: CarService) {}

  addCar() {
    const payload = {
      make: this.make,
      description: this.description,
      model: this.model,
      year: this.year,
      price: this.price,
    };

    this.carService.addCar(payload).subscribe((res) => {
      if (res.status === 200) alert('Car successfully created!');
    });
  }

  isVisible: boolean = false;

  toggleModal() {
    this.isVisible = true;

    this.closeModal.emit(false);

    console.log('isVisible: ', this.isVisible);
  }
}
