import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, every } from 'rxjs';
import { CarQueryParams } from 'src/app/interface/car/car-query-params.interface';
import { Car } from 'src/app/interface/car/car.interface';
import { CarService } from 'src/app/services/car/car.service';
import {
  faCaretRight,
  faCaretLeft,
  faPlus,
  faFilter,
  faSort,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isModalVisible = false;
  isFilterHidden = false;
  isRequestComplete = false;
  isCarRequestComplete = false;
  isSortHidden = false;

  // ICONS
  arrow_right = faCaretRight;
  arrow_left = faCaretLeft;
  plus = faPlus;
  filter = faFilter;
  sort = faSort;

  subscription!: Subscription;

  cars: Car[] = [];

  // QUERY PARAMS
  params: CarQueryParams = {
    page: 1,
    limit: 4,
    sortBy: 'make',
    sortOrder: 'ASC',
    filters: {},
  };

  carMake: { make: string }[] = [];
  carModel: { model: string }[] = [];
  carYear: { year: number }[] = [];

  constructor(private carService: CarService, private elementRef: ElementRef) {}

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleFilter() {
    this.isFilterHidden = !this.isFilterHidden;

    this.carService.getCarMake().subscribe(
      (make) => {
        this.carMake = make;
      },
      () => {},
      () => {
        this.isRequestComplete = true;
      }
    );
  }

  toggleSort() {
    this.isSortHidden = !this.isSortHidden;
  }

  closeModal(event: boolean) {
    this.isModalVisible = event;
  }

  removeCar(car: Car) {
    this.cars = this.cars.filter((value) => value.id !== car.id);
    this.carService.removeCar(car.id).subscribe();
  }

  updateCar(car: Car) {}

  getCars() {
    this.subscription = this.carService.getCars(this.params).subscribe(
      (data) => {
        this.cars = data;
      },
      () => {},
      () => {
        this.isCarRequestComplete = true;
      }
    );
  }
  getCarsNextPage() {
    this.isCarRequestComplete = false;
    this.params.page += 1;

    this.subscription = this.carService.getCars(this.params).subscribe(
      (data) => {
        this.cars = data;
      },
      () => {},
      () => {
        this.isCarRequestComplete = true;
      }
    );
  }
  getCarsPreviousPage() {
    this.isCarRequestComplete = false;
    this.params.page -= 1;

    this.subscription = this.carService.getCars(this.params).subscribe(
      (data) => {
        this.cars = data;
      },
      () => {},
      () => {
        this.isCarRequestComplete = true;
      }
    );
  }

  getCarModelByMake(make: string) {
    this.carService
      .getCarModelByMake(make)
      .subscribe((data) => (this.carModel = data));
  }

  getCarswithInput(page: number) {
    this.isCarRequestComplete = false;

    this.subscription = this.carService.getCars(this.params).subscribe(
      (data) => {
        this.cars = data;
      },
      () => {},
      () => {
        this.isCarRequestComplete = true;
      }
    );
  }

  sortUp(): void {
    this.cars = this.cars
      .map((car) => car)
      .sort((a: Car, b: Car) => a.make.localeCompare(b.make));
  }

  sortDown(): void {
    this.cars = this.cars
      .map((car) => car)
      .sort((a: Car, b: Car) => b.make.localeCompare(a.make));
  }

  filters(filter: {
    make?: string | undefined;
    model?: string | undefined;
    year?: number | undefined;
    from?: number | undefined;
    to?: number | undefined;
  }) {
    const filteredFilter = Object.fromEntries(
      Object.entries(filter).filter(([_, value]) => value !== undefined)
    );

    this.params.filters = filteredFilter;

    this.carService
      .getCars(this.params)
      .subscribe((data) => (this.cars = data));
  }

  ngOnInit(): void {
    this.getCars();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
