import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInformation } from 'src/app/interface/user/user-information.interface';
import { Login } from 'src/app/interface/user/user-login.interface';
import { LoginService } from 'src/app/services/user/login.service';

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

  logInDetails!: UserInformation;

  constructor(private loginService: LoginService, private router: Router) {}

  login(element: any) {
    this.isLoading = true;

    if (this.isLoading) {
      element.textContent = 'Loading...';
    }

    const creds: Login = { email: this.username, password: this.password };

    this.subscribe = this.loginService.login(creds).subscribe((res) => {
      this.logInDetails = { token: res.token, user: res.user };

      this.isLoading = false;

      element.textContent = 'Login';

      console.log(res);

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
