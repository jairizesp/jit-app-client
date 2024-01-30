import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarQueryParams } from 'src/app/interface/car/car-query-params.interface';
import { Car } from 'src/app/interface/car/car.interface';
import { getHttpOptions } from 'src/app/shared/utils/http-options';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  url = 'http://localhost:3000/cars';

  constructor(private _http: HttpClient) {}

  getCars(q_params: CarQueryParams): Observable<Car[]> {
    let params = new HttpParams()
      .set('page', q_params.page.toString())
      .set('limit', q_params.limit.toString())
      .set('sortBy', q_params.sortBy)
      .set('sortOrder', q_params.sortOrder);

    Object.keys(q_params.filters).forEach((key) => {
      params = params.set(key, q_params.filters[key]);
    });

    return this._http.get<Car[]>(this.url, { params, ...getHttpOptions() });

    // return this._http.get<Car[]>(
    //   `${this.url}?page=${q_params.page}&limit=${q_params.limit}&sortBy=${q_params.sortBy}&sortOrder=${q_params.sortOrder}}`,
    //   getHttpOptions()
    // );
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

  addCar(
    details: Omit<Car, 'id'>
  ): Observable<{ error?: string; msg?: string; status: number }> {
    return this._http.post<{ error?: string; msg?: string; status: number }>(
      this.url,
      details,
      getHttpOptions()
    );
  }

  removeCar(id: number): Observable<any> {
    return this._http.delete<any>(`${this.url}/${id}`, getHttpOptions());
  }

  updateCar(car: Car): Observable<Car> {
    return this._http.put<Car>(`${this.url}/${car.id}`, car, getHttpOptions());
  }
}
