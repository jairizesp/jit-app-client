import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/interface/user/user-login.interface';
import { Observable } from 'rxjs';
import { UserInformation } from 'src/app/interface/user/user-information.interface';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/auth/login';

  constructor(private _http: HttpClient) {}

  login(creds: Login): Observable<UserInformation> {
    return this._http.post<UserInformation>(this.url, creds, httpOptions);
  }
}
