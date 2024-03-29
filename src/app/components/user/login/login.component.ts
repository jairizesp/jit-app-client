import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/interface/response/api-response.interface';
import { UserInformation } from 'src/app/interface/user/user-information.interface';
import { Login } from 'src/app/interface/user/user-login.interface';
import { LoginService } from '../../../services/user/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
  username!: string;
  password!: string;

  subscribe!: Subscription;
  isLoading: boolean = false;

  show_invalid_credentials: boolean = false;

  logInDetails!: UserInformation;

  constructor(private loginService: LoginService, public router: Router) {}

  login(element: any) {
    this.isLoading = true;

    if (this.isLoading) {
      element.textContent = 'Loading...';
    }

    const creds: Login = { email: this.username, password: this.password };

    this.subscribe = this.loginService.login(creds).subscribe((res) => {
      if (res.status !== 200) {
        this.show_invalid_credentials = true;
        this.isLoading = false;
        element.textContent = 'Login';
        return;
      }
      this.logInDetails = { token: res.token, user: res.user };

      this.isLoading = false;

      element.textContent = 'Login';

      localStorage.setItem('token', JSON.stringify(res.token));
      localStorage.setItem('user', JSON.stringify(res.user));

      this.router.navigateByUrl('/home');
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
  }
}
