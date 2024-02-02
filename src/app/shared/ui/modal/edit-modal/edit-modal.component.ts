import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StateService } from 'src/app/services/states/state.service';
import { faCarCrash } from '@fortawesome/free-solid-svg-icons';
import { Car } from 'src/app/interface/car/car.interface';
import { CarService } from 'src/app/services/car/car.service';
import { CarQueryParams } from 'src/app/interface/car/car-query-params.interface';
import { Subscription } from 'rxjs';
import { HomeComponent } from 'src/app/components/home/home.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  @Output() closeModal = new EventEmitter<boolean>();

  subscription!: Subscription;
  @Output() update_success: EventEmitter<boolean> = new EventEmitter();

  // update_success!: boolean;

  id!: number;
  make!: string;
  description!: string;
  model!: string;
  year!: number;
  price!: number;
  is_loading!: boolean;

  @Input() car!: Car;

  form!: FormGroup;

  update = faCarCrash;

  params: CarQueryParams = {
    page: 1,
    limit: 4,
    sortBy: 'make',
    sortOrder: 'ASC',
    filters: {},
  };

  constructor(
    private stateService: StateService,
    private carService: CarService
  ) {}

  isModalVisible!: boolean;

  updateCar() {
    if (this.form.valid) {
      this.form.value['id'] = this.id;
      this.is_loading = true;

      this.carService.updateCar(this.form.value).subscribe(
        (response) => {
          if (response.status === 200) {
            this.update_success.emit(true);
            this.carService.updatedCar();
            this.stateService.toggleEditModal();
          }
        },
        () => {},
        () => {
          this.is_loading = false;
        }
      );
    }
  }

  isVisible: boolean = false;

  toggleModal() {
    this.stateService.toggleEditModal();

    this.closeModal.emit(false);
  }

  ngOnInit(): void {
    this.id = this.car.id;

    this.form = new FormGroup({
      make: new FormControl(this.car.make, Validators.required),
      description: new FormControl(this.car.description, Validators.required),
      model: new FormControl(this.car.model, Validators.required),
      year: new FormControl(this.car.year, Validators.required),
      price: new FormControl(this.car.price, Validators.required),
    });
  }
}
