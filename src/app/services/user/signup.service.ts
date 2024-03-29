import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Signup } from 'src/app/interface/user/user-signup.inteface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  url = 'http://localhost:3000/auth/register';

  constructor(private _http: HttpClient) {}

  signup(details: Signup): Observable<{ status: number; error?: string }> {
    return this._http.post<{ status: number; error?: string }>(
      this.url,
      details,
      httpOptions
    );
  }
}
