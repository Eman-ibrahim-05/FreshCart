import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, UserDataLogin } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading = false;
  showPassword = false;

  private authService = inject(AuthService);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z@0-9]{5,10}$/),
    ]),
  });

  login(value: UserDataLogin) {
    this.isLoading = true;
    this.authService.login(value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toaster.success('Login Successful', 'Success');
        console.log('Login Successful: ', response);
        localStorage.setItem('token', response.token);
        this.authService.decodedToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login Failed: ', error);
        if (error?.error?.message) {
          this.toaster.error(error.error.message, 'Failed');
        }
      },
    });
  }

  handleSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const values = this.loginForm.value;
    this.login(values);
  }

  get emailController() {
    return this.loginForm.get('email');
  }
  get passwordController() {
    return this.loginForm.get('password');
  }
}
