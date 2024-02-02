import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CarService } from '../../../../services/car/car.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() add_success: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;

  make!: string;
  description!: string;
  model!: string;
  year!: number;
  price!: number;

  is_loading: boolean = false;
  is_success: boolean = false;

  constructor(private carService: CarService) {}

  addCar() {
    this.is_loading = true;
    const payload = {
      make: this.make,
      description: this.description,
      model: this.model,
      year: this.year,
      price: this.price,
    };

    this.carService.addCar(payload).subscribe((res) => {
      this.closeModal.emit(false);
      if (res.status === 201) this.add_success.emit(true);

      this.is_loading = false;
    });
  }

  isVisible: boolean = false;

  toggleModal() {
    this.isVisible = true;

    this.closeModal.emit(false);

    console.log('isVisible: ', this.isVisible);
  }

  onSubmit() {
    this.is_loading = true;

    if (this.form.status === 'VALID') {
      this.carService.addCar(this.form.value).subscribe((res) => {
        this.closeModal.emit(false);
        if (res.status === 201) this.add_success.emit(true);

        this.is_loading = false;
      });
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      make: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      model: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }
}
