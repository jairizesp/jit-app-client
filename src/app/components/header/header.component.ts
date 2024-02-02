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

    try {
      if (user_details) {
        user = JSON.parse(user_details);
      }
    } catch (error) {
      console.error('Error parsing user_details:', error);
    }
    return user;
  }

  constructor(public router: Router) {}

  ngOnInit(): void {}

  logout() {
    localStorage.clear();
    this.isLogOutVisible = false;
    this.router.navigateByUrl('/login');
  }

  showLogOut() {
    this.isLogOutVisible = !this.isLogOutVisible;
  }
}
