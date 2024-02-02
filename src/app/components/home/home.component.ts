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
import { CarService } from '../../services/car/car.service';
import {
  faCaretRight,
  faCaretLeft,
  faPlus,
  faFilter,
  faSort,
  faSearch,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { StateService } from '../../services/states/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isModalVisible = false;
  isEditModalVisible = false;
  isFilterHidden = false;
  isRequestComplete = false;
  isCarRequestComplete = false;
  isSortHidden = false;
  remove_success = false;
  add_success!: boolean;

  search_term!: string | number;

  start: number = 1;

  total!: number;
  max_page!: number;
  data_length: number = 4;

  // ICONS
  arrow_right: IconDefinition = faCaretRight;
  arrow_left: IconDefinition = faCaretLeft;
  plus: IconDefinition = faPlus;
  filter: IconDefinition = faFilter;
  sort: IconDefinition = faSort;
  icn_search: IconDefinition = faSearch;

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

  constructor(
    private carService: CarService,
    private stateService: StateService
  ) {}

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
    this.isRequestComplete = false;
    this.getCars();
    this.isModalVisible = event;
  }

  removeCar(car: Car) {
    this.isCarRequestComplete = false;
    this.cars = this.cars.filter((value) => value.id !== car.id);
    this.carService.removeCar(car.id).subscribe(() => this.getCars());
  }

  updateCar(car: Car) {}

  getCars() {
    this.subscription = this.carService.getCars(this.params).subscribe(
      (value) => {
        this.cars = value.data;
        this.total = value.total;
        this.max_page = Math.ceil(value.total / this.params.limit);
      },
      () => {},
      () => {
        this.isCarRequestComplete = true;
      }
    );
  }

  limit_length = 0;

  getCarsNextPage() {
    this.isCarRequestComplete = false;
    this.params.page += 1;

    this.subscription = this.carService.getCars(this.params).subscribe(
      (data) => {
        this.limit_length = data.data.length;
        this.cars = data.data;
        this.start += data.data.length;
        this.data_length = this.start + data.data.length - 1;
        if (this.data_length + 1 === data.total) this.data_length += 1;

        console.log(this.limit_length);
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
        this.cars = data.data;
        this.start -= data.data.length;
        this.data_length -= this.limit_length;
        this.limit_length = data.data.length;
        if (this.start < 1) this.start = 1;
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
        this.cars = data.data;
        if (data.data.length) {
          this.start =
            this.params.limit * this.params.page - data.data.length + 1;
        }
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
      .subscribe((data) => (this.cars = data.data));
  }

  isAddCarSuccess(is_success: boolean) {
    this.add_success = is_success;
  }

  isEditCarSuccess(is_success: boolean) {
    this.add_success = false;
    this.add_success = is_success;
  }

  search() {
    this.params.filters['search_term'] = this.search_term;

    this.isCarRequestComplete = false;

    if (this.search_term) {
      this.carService.getCarsBySearch(this.search_term).subscribe(
        (value) => {
          console.log(value);
          this.cars = value.data;
          this.total = value.total;
          this.data_length = value.data.length;
          this.max_page = Math.ceil(value.total / this.params.limit);
        },
        () => {},
        () => {
          this.isCarRequestComplete = true;
        }
      );
    } else {
      this.subscription = this.carService.getCars(this.params).subscribe(
        (value) => {
          this.cars = value.data;
          this.total = value.total;
          this.data_length = 4;
          this.max_page = Math.ceil(value.total / this.params.limit);
        },
        () => {},
        () => {
          this.isCarRequestComplete = true;
        }
      );
    }
  }

  ngOnInit(): void {
    this.getCars();

    this.carService.carUpdated$.subscribe((isUpdated) => {
      if (isUpdated) {
        this.stateService.isEditModalVisible = false;
        this.getCars();
      }
    });

    this.isEditModalVisible = this.stateService.isEditModalVisible;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
