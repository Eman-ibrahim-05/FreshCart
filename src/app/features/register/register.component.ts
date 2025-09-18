import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService, UserData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isLoading = false;

  private authService = inject(AuthService);
  private toaster = inject(ToastrService);
  private router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z@0-9]{5,10}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
    },
    { validators: this.matchPasswordValidation }
  );

  register(value: UserData) {
    this.isLoading = true;
    this.authService.register(value).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toaster.success('Registeration Successful', 'Success');
        console.log('Registeration Successful: ', response);
        localStorage.setItem('token', response.token);
        this.authService.decodedToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registeration Failed: ', error);
        if (error?.error?.message) {
          this.toaster.error(error.error.message, 'Failed');
        }
      },
    });
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const values = this.registerForm.value;
    this.register(values);
  }

  matchPasswordValidation(group: AbstractControl): null | Record<string, any> {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;
    return password == rePassword
      ? null
      : {
          noMatch: {
            passwordValue: password,
            rePasswordValue: rePassword,
          },
        };
  }

  get nameController() {
    return this.registerForm.get('name');
  }
  get emailController() {
    return this.registerForm.get('email');
  }
  get passwordController() {
    return this.registerForm.get('password');
  }
  get rePasswordController() {
    return this.registerForm.get('rePassword');
  }
  get phoneController() {
    return this.registerForm.get('phone');
  }
}
