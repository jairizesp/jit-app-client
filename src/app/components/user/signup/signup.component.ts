import { Component } from '@angular/core';
import { Signup } from 'src/app/interface/user/user-signup.inteface';
import { SignupService } from 'src/app/services/user/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private signUpService: SignupService) {}

  signup() {
    const payload: Signup = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.signUpService.signup(payload).subscribe((res) => {
      // switch (res.error.status) {
      //   case 200:
      //     alert('Successfully Registered!');
      //     break;
      //   case 409:
      //     alert('Email already registered!');
      //     break;
      // }
      if (res.status === 200) {
        alert('SUCESS');
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';
      }
    });
  }
}
