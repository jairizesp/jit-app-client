import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CarQueryParams } from 'src/app/interface/car/car-query-params.interface';
import { Car } from 'src/app/interface/car/car.interface';
import { getHttpOptions } from '../../shared/utils/http-options';

export interface ExtendedCar {
  data: Car[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = 'http://localhost:3000/cars';

  constructor(private _http: HttpClient) {}

  getCars(q_params: CarQueryParams): Observable<ExtendedCar> {
    let params = new HttpParams()
      .set('page', q_params.page.toString())
      .set('limit', q_params.limit.toString())
      .set('sortBy', q_params.sortBy)
      .set('sortOrder', q_params.sortOrder);

    Object.keys(q_params.filters).forEach((key) => {
      params = params.set(key, q_params.filters[key]);
    });

    return this._http.get<ExtendedCar>(this.url, {
      params,
      ...getHttpOptions(),
    });
  }

  getCarsBySearch(search_term: string | number): Observable<ExtendedCar> {
    return this._http.get<ExtendedCar>(
      `${this.url}/search?search_term=${search_term}`,
      getHttpOptions()
    );
  }

  getCarMake(): Observable<{ make: string }[]> {
    return this._http.get<{ make: string }[]>(
      `${this.url}/make`,
      getHttpOptions()
    );
  }

  getCarModelByMake(make: string): Observable<Car[]> {
    return this._http.get<Car[]>(
      `${this.url}/model-by-make?make=${make}`,
      getHttpOptions()
    );
  }

  getCarModel(): Observable<{ model: string }[]> {
    return this._http.get<{ model: string }[]>(
      `${this.url}/model`,
      getHttpOptions()
    );
  }

  getCarYear(): Observable<{ year: number }[]> {
    return this._http.get<{ year: number }[]>(
      `${this.url}/year`,
      getHttpOptions()
    );
  }

  addCar(details: Omit<Car, 'id'>): Observable<any> {
    return this._http.post<any>(this.url, details, getHttpOptions());
  }

  removeCar(id: number): Observable<any> {
    return this._http.delete<any>(`${this.url}/${id}`, getHttpOptions());
  }

  updateCar(car: Car): Observable<{ status: number }> {
    return this._http.put<{ status: number }>(
      `${this.url}/${car.id}`,
      car,
      getHttpOptions()
    );
  }

  findCarById(id: number): Observable<Car> {
    return this._http.get<Car>(`${this.url}/${id}`, getHttpOptions());
  }

  private carUpdatedSource = new BehaviorSubject<boolean>(false);
  carUpdated$ = this.carUpdatedSource.asObservable();

  updatedCar() {
    this.carUpdatedSource.next(true);
  }
}
