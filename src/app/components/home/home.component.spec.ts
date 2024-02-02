import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CarService } from '../../services/car/car.service';
import { StateService } from '../../services/states/state.service';
import { of, throwError } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FiltersComponent } from '../filters/filters.component';
import { CarsComponent } from '../cars/cars.component';
import { ModalComponent } from '../../shared/ui/modal/add-car-modal/modal.component';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner.component';
import { ToastComponent } from '../../shared/ui/toasts/toast/toast.component';
import { FormsModule } from '@angular/forms';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let carService: jest.Mocked<CarService>;
  let stateService: jest.Mocked<StateService>;

  beforeEach(() => {
    const carServiceMock = {
      getCars: jest.fn(() => of({ data: [], total: 0 })),
      getCarMake: jest.fn(),
      getCarModelByMake: jest.fn(),
      removeCar: jest.fn(),
      getCarsBySearch: jest.fn(),
      carUpdated$: of(true),
    } as unknown as jest.Mocked<CarService>;

    const stateServiceMock = {
      isEditModalVisible: false,
    } as unknown as jest.Mocked<StateService>;

    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        FiltersComponent,
        CarsComponent,
        ModalComponent,
        SpinnerComponent,
        ToastComponent,
      ],
      imports: [FontAwesomeModule, FormsModule],
      providers: [
        { provide: CarService, useValue: carServiceMock },
        { provide: StateService, useValue: stateServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    carService = TestBed.inject(CarService) as jest.Mocked<CarService>;
    stateService = TestBed.inject(StateService) as jest.Mocked<StateService>;
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCars on ngOnInit', fakeAsync(() => {
    // Arrange
    const getCarsSpy = jest.spyOn(component, 'getCars');

    // Act
    component.ngOnInit();
    tick();

    // Assert
    expect(getCarsSpy).toHaveBeenCalled();
  }));

  it('should sort cars in ascending order on sortUp', () => {
    // Arrange
    component.cars = [
      {
        id: 1,
        description: '...',
        model: 'Model1',
        year: 2022,
        price: 30000,
        make: 'BMW',
      },
      {
        id: 2,
        description: '...',
        model: 'Model2',
        year: 2021,
        price: 25000,
        make: 'Audi',
      },
      {
        id: 3,
        description: '...',
        model: 'Model3',
        year: 2020,
        price: 20000,
        make: 'Toyota',
      },
    ];

    // Act
    component.sortUp();

    // Assert
    expect(component.cars).toEqual([
      {
        id: 2,
        description: '...',
        model: 'Model2',
        year: 2021,
        price: 25000,
        make: 'Audi',
      },
      {
        id: 1,
        description: '...',
        model: 'Model1',
        year: 2022,
        price: 30000,
        make: 'BMW',
      },
      {
        id: 3,
        description: '...',
        model: 'Model3',
        year: 2020,
        price: 20000,
        make: 'Toyota',
      },
    ]);
  });

  it('should sort cars in descending order on sortDown', () => {
    // Arrange
    component.cars = [
      {
        id: 1,
        description: '...',
        model: 'Model1',
        year: 2022,
        price: 30000,
        make: 'BMW',
      },
      {
        id: 2,
        description: '...',
        model: 'Model2',
        year: 2021,
        price: 25000,
        make: 'Audi',
      },
      {
        id: 3,
        description: '...',
        model: 'Model3',
        year: 2020,
        price: 20000,
        make: 'Toyota',
      },
    ];

    // Act
    component.sortDown();

    // Assert
    expect(component.cars).toEqual([
      {
        id: 3,
        description: '...',
        model: 'Model3',
        year: 2020,
        price: 20000,
        make: 'Toyota',
      },
      {
        id: 1,
        description: '...',
        model: 'Model1',
        year: 2022,
        price: 30000,
        make: 'BMW',
      },
      {
        id: 2,
        description: '...',
        model: 'Model2',
        year: 2021,
        price: 25000,
        make: 'Audi',
      },
    ]);
  });

  it('should tooggle sort', () => {
    component.isSortHidden = false;

    component.toggleSort();

    expect(component.isSortHidden).toBeTruthy();

    component.toggleSort();
    expect(component.isSortHidden).toBeFalsy();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
