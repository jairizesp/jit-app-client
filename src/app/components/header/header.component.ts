import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UserDetails,
  UserInformation,
} from 'src/app/interface/user/user-information.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogOutVisible: boolean = false;

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  get user_info(): {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
  } {
    const user_details = localStorage.getItem('user');

    let user!: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };

    if (user_details) user = JSON.parse(user_details);

    return user;
  }

  // get user(): UserDetails {
  //   const user_details = localStorage.getItem('user');

  //   if (user_details) {
  //     this.user_info = JSON.parse(user_details);
  //   }

  //   return this.user_info;
  // }

  constructor(private router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  showLogOut() {
    this.isLogOutVisible = !this.isLogOutVisible;
  }
}
