import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../services/user/user-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  apiError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserServices,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.apiError = null;

    this.userService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login success:', response);

        localStorage.setItem('token', response.token);
        if (response.user.role === 'admin') {
          localStorage.setItem('isAdmin', 'admin');
          this.router.navigate(['/admin']);
        } else {
          localStorage.setItem('isAdmin', 'user');
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.apiError =
          err?.error?.message || 'Login failed. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
