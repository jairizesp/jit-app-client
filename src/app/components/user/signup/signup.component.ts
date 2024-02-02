import { Component, OnInit } from '@angular/core';
import { Signup } from 'src/app/interface/user/user-signup.inteface';
import { SignupService } from '../../../services/user/signup.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const passwordMatchValidator = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  // Check if passwords match
  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  // firstName!: string;
  // lastName!: string;
  // email!: string;
  // password!: string;
  // confirmPassword!: string;

  form!: FormGroup;
  is_loading = false;
  error_message!: string;
  success: boolean = false;

  constructor(private signUpService: SignupService) {}
  // alert('SUCESS');

  signup() {
    if (this.form.valid) {
      this.is_loading = true;

      const { confirmPassword, ...payload } = this.form.value;

      this.signUpService.signup(payload).subscribe((res) => {
        switch (res.status) {
          case 200:
            this.form.reset();
            this.error_message = '';
            this.success = true;
            break;
          case 422:
            this.error_message = res.error;
            break;
          case 409:
            this.error_message = res.error;
        }

        this.is_loading = false;
      });
    }
  }

  // Custom validator function

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }
}
