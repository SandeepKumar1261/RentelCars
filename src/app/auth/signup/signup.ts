import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user/user-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  signupForm: FormGroup;
  apiError: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserServices,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.apiError = '';
    if (this.signupForm.valid) {
      this.userService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.signupForm.reset();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup error:', error.error.message);
          this.apiError =
            error.error.message || 'Signup failed. Please try again.';
        },
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get f() {
    return this.signupForm.controls;
  }
}
