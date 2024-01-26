import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this._http.get<Car[]>(this.url, getHttpOptions());
  }

  getCarMake(): Observable<{ make: string }[]> {
    return this._http.get<{ make: string }[]>(
      `${this.url}/make`,
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
}
